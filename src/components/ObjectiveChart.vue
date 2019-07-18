<template>
  <div class="global-objectives__container">
    <div
      class="global-objectives__chart-container"
      style="transform: rotateY(180deg) rotateX(180deg)">
      <apexchart
        class="global-objectives__chart global-objectives__chart_background"
        type="radialBar"
        height="100%"
        :options="options2"
        :series="objectiveTracks"></apexchart>
      <apexchart
        class="global-objectives__chart"
        type="radialBar"
        height="100%"
        :options="options"
        :series="objectiveProgresses"></apexchart>
    </div>
    <div class="global-objectives__details">
      <div>
        <div class="global-objectives__detail" v-for="objective in objectivesWithRelativeValues" :key="objective.name">
          <div class="global-objectives__detail__progress">{{ objective.progress }}%
            <div class="global-objectives__detail__weeks"><strong>{{ objective.weeksDone }}</strong> of {{ objective.weeks }} weeks</div></div>
          <div class="global-objectives__detail__name">{{ objective.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "objective-chart",

  props: ["objectives"],

  data() {
    return {
      options: {
        chart: {},
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: -50,
            endAngle: 230,
            track: {
              show: true,
              startAngle: undefined,
              endAngle: undefined,
              background: "#11264a",
              strokeWidth: "0%",
              opacity: 1,
              margin: 5
            },
            hollow: {
              margin: 50,
              size: "40%",
              background: "transparent",
              image: undefined,
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 1
              }
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                show: false
              }
            }
          }
        },
        // colors: [
        //   "#ffffff",
        //   "#d9e506",
        //   "#d3dc2d",
        //   "#6879ae",
        //   "#56c5c9",
        //   "#aaa",
        //   "#eee"
        // ],
        colors: ['#d3dc2d', '#56c5c9', '#6879ae'],
        fill: {
          opacity: 1
        }
      },

      options2: {
        chart: {
          animations: {
            enabled: false
          }
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: -50,
            endAngle: 230,
            track: {
              show: true,
              startAngle: undefined,
              endAngle: undefined,
              background: "transparent",
              strokeWidth: "0%",
              opacity: 1,
              margin: 5
            },
            hollow: {
              margin: 50,
              size: "40%",
              background: "transparent",
              image: undefined,
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 1
              }
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                show: false
              }
            }
          }
        },
        // colors: [
        //   "#102649",
        //   "#102649",
        //   "#102649",
        //   "#102649",
        //   "#102649",
        //   "#102649",
        //   "#102649"
        // ],
        colors: ['#102649', '#102649', '#102649'],
        fill: {
          opacity: 1
        }
      },

      series: [40, 80, 60, 80, 56, 65, 55],
      series2: [100, 90, 85, 85, 80, 78, 75]
    };
  },

  computed: {
    objectivesWithRelativeValues() {
      let objectives = this.objectives.map(objective => {
        return {
          name: objective.name,
          weeks: objective.weeks,
          weeksDone: objective.weeksDone,
          progress: objective.progress
        }
      })

      let longestObjective = objectives[0]

      objectives = objectives.map((objective, i) => {
        let relativeModifierToLongest =
          objective.weeks / longestObjective.weeks;
        let trackLength = Math.ceil(relativeModifierToLongest * 100 * 1.1);
        if (trackLength < 10) trackLength *= 3;
        else if (trackLength < 50) trackLength *= 1.5;
        if (trackLength > 100) trackLength = 100;
        let progressOnTrack = Math.ceil(
          (objective.progress / 100) * trackLength
        )

        return {
          name: objective.name,
          weeks: objective.weeks,
          weeksDone: objective.weeksDone,
          progress: objective.progress,
          trackLength,
          progressOnTrack
        }
      })

      return objectives
    },

    objectiveTracks() {
      return this.objectivesWithRelativeValues.map(
        objective => objective.trackLength
      )
    },

    objectiveProgresses() {      
      return this.objectivesWithRelativeValues.map(
        objective => objective.progressOnTrack
      )
    }
  },

  methods: {}
}
</script>