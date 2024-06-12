import { Injectable } from '@nestjs/common';
import { client } from 'src/client';

@Injectable()
export class OrdersService {
  async getAll(name?: string) {
    const leads = (
      await client.request.get(`/api/v2/leads?${name ? 'name=' + name : ''}`)
    ).data['_embedded']['items'];

    const newLeads = [];

    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];

      const status = (
        await client.request.get(
          `/api/v4/leads/pipelines/${lead.pipeline_id}/statuses/${lead.status_id}`,
        )
      ).data;

      const responsibleUser = (
        await client.request.get(`/api/v4/users/${lead.responsible_user_id}`)
      ).data;

      if (!lead.main_contact.id) {
        newLeads.push({ ...lead, user: responsibleUser, status });
        break;
      }

      const contact = (
        await client.request.get(`/api/v4/contacts/${lead.main_contact.id}`)
      ).data;

      newLeads.push({ ...lead, user: responsibleUser, contact, status });
    }

    return newLeads;
  }
}
