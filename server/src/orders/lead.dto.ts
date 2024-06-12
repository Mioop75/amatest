import { Expose, Type } from 'class-transformer';

class StatusDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  color: string;
}

class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}

class ContactDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;
}

export class LeadDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  created_by: number;

  @Expose()
  created_at: number;

  @Expose()
  sale: number;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => ContactDto)
  contact: ContactDto;

  @Expose()
  @Type(() => StatusDto)
  status: StatusDto;
}
