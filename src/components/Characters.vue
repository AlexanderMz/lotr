<template>
  <!-- <a-table :columns="columns" :data-source="characters" /> -->
  <a-table
      :dataSource="characters"
      :columns="columns"
      :pagination="{ pageSize: 10 }"
      :loading="loading"
      @change="onChange"
    >
    </a-table>
</template>
<script>
import apiClient from '../lib/apiClient'

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

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
    filters: [
      {
        text: 'Male',
        value: 'male',
      },
      {
        text: 'Female',
        value: 'female',
      },
    ],
    // filters: this.getRace(),
    filterMultiple: true,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
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

export default{
  data() {
    return {
      characters: [],
      races: [],
      columns
    }
  },
  created() {
    this.getCharacters();
  },
  updated() {
    // this.getRace()
  },
  methods: {
    onChange,
    getRace () {
      console.log('races', this.characters.race)
      this.characters.map(character => {
        let races = {}
        races.race = character.race
        this.races.push(races)
      })
    },
    async getCharacters() {
      try {
        const characters = await apiClient({
          url: '/character'
        })
        await characters.map(character => {
        let item = {}
        item.id = character.id;
        item.name = character.name;
        item.race = character.race;
        item.gender = character.gender;
        item.hair = character.hair;
        item.height = character.height;
        item.house = character.house;
        this.characters.push(item)
      })
      } catch (err) {
        throw new Error(err)
      }
    }
  },
};
</script>
