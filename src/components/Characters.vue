<template>
  <a-table
    :columns="columns"
    :dataSource="characters"
    :pagination="{ pageSize: 30 }"
    :loading="loading"
    @change="onChange"
  >
  </a-table>
  <!-- <h4 v-if="characters">{{ characters }}</h4> -->
</template>
<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash'


const dataOld = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

function onChange (pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

export default {
  setup () {
    const store = useStore();
    onMounted(() => {
      store.dispatch('getCharacters')
    })
    const characters = computed(() => store.state.characters)
    const getFilter = (key) => Object.keys(_.groupBy(characters.value, n => n[key])).map(k => { return { text: k, value: k } })
    const columns = [
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
        filters: getFilter('race'),
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

    console.log('characters', characters)

    return {
      dataOld,
      characters,
      columns,
      getFilter,
    };
  },
  methods: {
    onChange,
  },
};
</script>
