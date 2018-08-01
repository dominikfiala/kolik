<template>
  <div class="view">
    <!-- Initial Page, "data-name" contains page name -->
    <div class="page">
      <app-navbar>
        <span slot="title">Časová osa</span>
      </app-navbar>

      <app-toolbar></app-toolbar>

      <empty-page v-if="recordsByDay.length === 0">
        <p>Zatím nemáš záznam<br>žádné počítané jednotky.</p>
      </empty-page>

      <div v-if="recordsByDay.length" class="page-content">
        <div class="timeline margin-bottom">
          <div v-for="dayGroup in recordsByDay" v-bind:key="dayGroup.day" class="timeline-item">
            <div class="timeline-item-date">{{ dayGroup.day|date }}</div>
            <div class="timeline-item-divider"></div>
            <div class="timeline-item-content">
              <div v-for="record in dayGroup.items" v-bind:key="record.time" class="timeline-item-inner">
                <div class="timeline-item-time">{{ record.time|time }}</div>
                <div class="timeline-item-title">{{ record.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import AppToolbar from '../components/AppToolbar.vue'
import AppNavbar from '../components/AppNavbar.vue'
import EmptyPage from '../components/EmptyPage.vue'

export default {
  name: 'TimelinePage',
  computed: {
    recordsByDay() {
      const output = []

      const metricNames = this.$store.state.metrics
        .reduce((accumulator, metric) => {
          accumulator[metric.id] = `${metric.emoji} ${metric.name}`
          return accumulator
        }, {})

      this.$store.state.records
        .slice(0)
        .sort((a, b) => b.time - a.time)
        .map(record => {
          let day = parseInt(new moment(record.time).startOf('day').format('x'))
          let item = {
            time: record.time,
            name: metricNames[record.metric]
          }

          let dayGroup = output.find(dayGroup => dayGroup.day === day)
          if (dayGroup) {
            dayGroup.items.push(item)
          }
          else {
            output.push({
              day: day,
              items: [item]
            })
          }
        })

      output.map(group => {
        group.items.sort((a, b) => b.time - a.time)
      })

      return output
    }
  },
  components: {
    AppToolbar,
    AppNavbar,
    EmptyPage,
  }
}
</script>
