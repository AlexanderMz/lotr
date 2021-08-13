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
//import apiClient from '../lib/apiClient'
import _ from 'lodash'
import characters from '../data/characters'
function onChange (pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

const getFilter = (arr, key) => Object.keys(_.groupBy(arr, n => n[key])).map(k => { return { text: k, value: k } })


export default {
  data () {
    return {
      characters: characters.docs,
      races: [],
      columns: []
    }
  },
  created () {
    this.getCharacters();
  },
  computed: {

  },
  methods: {
    onChange,
    getRaces () {
      console.log('races', this.characters.race)
      this.characters.map(character => {
        let races = {}
        races.race = character.race
        this.races.push(races)
      })
    },
    async getCharacters () {
      try {
        // this.characters = await apiClient({
        //   url: '/character'
        // })

        this.columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length > b.name.length ? 1 : -1,
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
            sorter: (a, b) => a.death - b.death,
          },
          {
            title: 'Race',
            dataIndex: 'race',
            filters: getFilter(this.characters, 'race'),
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
      } catch (err) {
        throw new Error(err)
      }
    }
  },
};
</script>
