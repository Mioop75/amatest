<template>
	<a-input placeholder="От трех символов" :value="search" @change="searchItem($event)" />
	<a-table :columns="columns" :data-source="items">
		<template #bodyCell="{ column, record }">
			<template v-if="column.key === 'name'">
				<a>
					{{ record.name }}
				</a>
			</template>
			<template v-else-if="column.key === 'status'">
				<span>
					<a-tag :color="record.status.color" style="color: rgb(102, 102, 102)">
						{{ record.status.name }}
					</a-tag>
				</span>
			</template>
			<template v-else-if="column.key === 'user'">
				<span>
					{{ record.user.name }}
				</span>
			</template>
		</template>
		<template #expandedRowRender="{ column, record }">
			{{ record.contact.name }}
		</template>
	</a-table>
</template>

<script lang="ts">
import dayjs from 'dayjs'

export default {
	setup() {
		return {
			columns: [
				{
					title: 'Название',
					dataIndex: 'name',
					key: 'name',
				},
				{
					title: 'Бюджет',
					dataIndex: 'sale',
					key: 'budget',
				},
				{
					title: 'Статус',
					dataIndex: 'status',
					key: 'status',
				},
				{
					title: 'Ответственный',
					dataIndex: 'user',
					key: 'user',
				},
				{
					title: 'Дата создания',
					dataIndex: 'created_at',
					key: 'created_at',
				},
			],
		}
	},
	data() {
		return {
			search: '',
			items: [] as any[],
		}
	},
	created() {
		this.fetchData()
	},

	methods: {
		async fetchData(search?: string) {

			const response = await fetch(`http://localhost:3000/api/orders?${search ? 'name=' + search : ''}`)
			const data = await response.json()
			const leads = data.map((lead: any) => ({
				...lead,
				created_at: dayjs(lead.created_at).format('DD/MM/YYYY H:HH a')
			}))
			this.items = leads
		},
		searchItem: function (event: any) {
			setTimeout(() => {
				this.search = event.target.value
				this.fetchData(event.target.value)
			}, 1000)
		}
	},
}
</script>