<template>
  <a-table
    :columns="columns"
    :dataSource="characters"
    :pagination="{ pageSize: 30 }"
    :loading="loading"
    @change="onChange"
  >
  </a-table>
  <h4 v-if="characters">{{ characters }}</h4>
</template>
<script>
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';

function onChange (pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

export default {
  setup () {
    const store = useStore();
    let columns = reactive([])
    let characters = reactive([])
    let filterRace

    onMounted(async () => {
      console.log('mounted')
      await store.dispatch('getCharacters')
      store.dispatch('getFilter', 'race')
      characters = computed(() => store.state.characters)
      filterRace = computed(() => store.state.filters['race'])
      columns.values = [
        {
          title: 'Name',
          dataIndex: 'name',
          filters: [
            {
              text: 'Joe',
              value: 'Joe',
            },
            {
              text: 'Jim',
              value: 'Jim',
            },
            {
              text: 'Submenu',
              value: 'Submenu',
              children: [
                {
                  text: 'Green',
                  value: 'Green',
                },
                {
                  text: 'Black',
                  value: 'Black',
                },
              ],
            },
          ],
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          onFilter: (value, record) => record.name.indexOf(value) === 0,
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend'],
        },
        {
          title: 'Birth',
          dataIndex: 'age',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Death',
          dataIndex: 'death',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Race',
          dataIndex: 'race',
          filters: filterRace.value,
          filterMultiple: true,
          onFilter: (value, record) => record.race.indexOf(value) === 0,
          sorter: (a, b) => a.race > b.race ? 1 : -1,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Hair',
          dataIndex: 'hair',
        },
        {
          title: 'Height',
          dataIndex: 'height',
        },
        {
          title: 'Realm',
          dataIndex: 'realm',
        },
        {
          title: 'House',
          dataIndex: 'house',
        },
        {
          title: 'WikiUrl',
          dataIndex: 'wikiurl',
        },
      ];
    })


    return {
      characters,
      columns,
    };
  },
  methods: {
    onChange,
  },
};
</script>
