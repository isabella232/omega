<template>

  <el-container>
      <el-header height="50px">

      <el-row type="flex" class="row-bg" justify="start">
        <el-col class="header-logo-selector" :span="24">
          <div class="logo">
            <svg viewBox="0 0 225 50">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(1.000000, 1.000000)">
                      <g transform="translate(45.128205, 13.789174)" fill="#FFFFFF">
                          <path d="M154.538593,19.6671852 L156.123721,15.7053048 C158.016598,17.4659316 161.230103,18.5226838 164.531356,18.5226838 C168.360986,18.5226838 170.69449,17.642057 170.69449,15.3530541 C170.69449,12.976302 168.05261,13.1524274 163.651356,12.7124274 C158.5011,12.0956752 155.419219,11.2156752 155.419219,7.38604558 C155.419219,3.6002906 158.412724,0.519037037 164.883607,0.519037037 C168.405487,0.519037037 171.486114,1.13516239 173.907368,2.27966382 L172.498991,5.93316809 C170.649989,4.7002906 167.920986,4.17254131 164.927481,4.17254131 C161.493977,4.17254131 159.556598,5.14091738 159.556598,7.07766952 C159.556598,8.92667236 162.198479,8.88217094 166.424234,9.36667236 C170.253863,9.80667236 174.74412,10.3789231 174.74412,15.1330541 C174.74412,19.9310598 170.958365,22.176188 164.706855,22.176188 C160.657852,22.176188 157.048222,21.207812 154.538593,19.6671852"></path>
                          <path d="M154.722553,0.914911681 C149.440046,12.8444274 144.378165,23.6288148 140.019533,30.7603248 L135.397652,29.3074473 C137.378906,26.533943 138.964034,23.5849402 139.887282,21.648188 L130.291897,0.914911681 L135.486028,0.914911681 L142.484661,17.9501823 L149.616171,0.914911681 L154.722553,0.914911681 Z"></path>
                          <path d="M108.590558,19.6671852 L110.174433,15.7053048 C112.067311,17.4659316 115.281442,18.5226838 118.582068,18.5226838 C122.412952,18.5226838 124.745829,17.642057 124.745829,15.3530541 C124.745829,12.976302 122.103949,13.1524274 117.702695,12.7124274 C112.551812,12.0956752 109.470558,11.2156752 109.470558,7.38604558 C109.470558,3.6002906 112.464063,0.519037037 118.934946,0.519037037 C122.456199,0.519037037 125.53808,1.13516239 127.959333,2.27966382 L126.55033,5.93316809 C124.700701,4.7002906 121.971698,4.17254131 118.978821,4.17254131 C115.545316,4.17254131 113.608564,5.14091738 113.608564,7.07766952 C113.608564,8.92667236 116.249818,8.88217094 120.474946,9.36667236 C124.305829,9.80667236 128.795459,10.3789231 128.795459,15.1330541 C128.795459,19.9310598 125.009704,22.176188 118.758821,22.176188 C114.709191,22.176188 111.098934,21.207812 108.590558,19.6671852"></path>
                          <path d="M107.291618,1.31103704 L106.455493,5.84516809 C105.794866,5.40454131 104.82649,5.09679202 103.594239,5.09679202 C101.172986,5.09679202 99.3239829,6.90129345 98.532359,9.36642165 L98.532359,21.779812 L93.8221026,21.779812 L93.8221026,0.914911681 L98.2233561,0.914911681 L98.4878575,5.66904274 C99.3684843,2.49941311 101.349111,0.738786325 104.341989,0.738786325 C105.398741,0.738786325 106.630991,0.958786325 107.291618,1.31103704"></path>
                          <path d="M84.5724501,16.2336809 L84.5724501,13.2840513 C82.6795726,12.5801766 80.3021937,12.0518006 77.881567,12.0518006 C74.1396866,12.0518006 72.0268091,12.7118006 72.0268091,15.3530541 C72.0268091,17.9065584 74.5796866,18.610433 77.5731909,18.610433 C80.3905698,18.610433 83.075698,17.8181823 84.5724501,16.2336809 L84.5724501,16.2336809 Z M85.1447009,21.7800627 C84.9247009,21.0755613 84.7930769,20.1071852 84.7047009,19.2271852 C83.3401994,20.6355613 80.8750712,22.2200627 76.5609402,22.2200627 C72.0268091,22.2200627 67.4926781,20.3716866 67.4926781,15.6175556 C67.4926781,10.3789231 71.5868091,8.75054701 76.7803134,8.75054701 C79.8183191,8.75054701 82.5473219,9.49892308 84.5724501,10.3789231 L84.6163248,9.10217094 C84.6608262,5.36091738 81.9305698,4.2602906 78.101567,4.2602906 C74.8003134,4.2602906 72.2029345,5.18479202 70.750057,6.46154416 L69.210057,2.71966382 C71.4545584,1.53128775 74.315812,0.518410256 78.6731909,0.518410256 C84.5724501,0.518410256 89.0188319,3.07191453 88.8865812,9.54279772 C88.8420798,11.6118006 88.8420798,14.1208034 88.8420798,16.1898063 C88.8420798,19.4471852 88.9737037,20.8555613 89.2382051,21.7800627 L85.1447009,21.7800627 Z"></path>
                          <path d="M63.8781595,10.6871738 L63.8781595,21.7799373 L58.9917778,21.7799373 L58.9917778,10.6432991 C58.9917778,6.76916809 57.3627749,4.70079202 53.445396,4.70079202 C50.8041425,4.70079202 48.999641,5.62466667 47.7222621,7.1214188 L47.7222621,21.7799373 L42.7926325,21.7799373 L42.7926325,9.93879772 C42.7926325,6.63754416 41.3842564,4.6562906 37.554,4.6562906 C35.0888718,4.6562906 32.8443704,5.62466667 31.5237436,7.38592023 L31.5237436,21.7799373 L26.6373618,21.7799373 L26.6373618,0.915037037 L30.9953675,0.915037037 L31.3037436,3.9962906 C32.5798689,2.32341311 35.1333732,0.518911681 39.1391282,0.518911681 C42.439755,0.518911681 45.12551,2.01503704 46.2706382,4.39241595 C47.8545128,2.45566382 50.6280171,0.518911681 54.325396,0.518911681 C60.6646553,0.518911681 63.8781595,3.95241595 63.8781595,10.6871738"></path>
                          <path d="M18.3567749,9.14654701 C17.8722735,5.97691738 15.8477721,3.90854131 11.6220171,3.90854131 C7.83626211,3.90854131 5.41500855,5.84529345 4.75500855,9.14654701 L18.3567749,9.14654701 Z M22.9786553,11.8316752 L22.9786553,12.3600513 L4.57888319,12.3600513 C4.79888319,16.718057 7.83626211,18.4786838 12.0181425,18.4786838 C15.6277721,18.4786838 18.0929003,17.2903077 19.5012764,15.5735556 L21.8341538,18.8748091 C19.8535271,20.5915613 16.5961481,22.2205641 11.753641,22.2205641 C5.06275783,22.2205641 0.177002849,18.6109345 0.177002849,12.0078006 L0.177002849,11.4355499 C0.177002849,5.27304274 4.57888319,0.518911681 11.6658917,0.518911681 C20.1174017,0.518911681 23.0225299,6.28529345 22.9786553,11.8316752 L22.9786553,11.8316752 Z"></path>
                      </g>
                      <g>
                          <polygon fill="#687AAE" points="31.7028148 35.6373048 8.03495157 46.1039145 8.03495157 38.9899544 31.7028148 28.5233447"></polygon>
                          <polygon fill="#D3DC2E" points="15.8514701 21.4100114 15.8514701 28.5239715 31.7027521 21.4100114 31.7027521 14.2966781"></polygon>
                          <polygon fill="#428074" points="15.8514701 21.4100114 15.8514701 28.5239715 0.000188034188 21.4100114 0.000188034188 14.2966781"></polygon>
                          <polygon fill="#4EB273" points="31.7028148 7.18271795 0.000250712251 21.4100114 0.000250712251 14.2960513 31.7028148 0.0687578348"></polygon>
                      </g>
                  </g>
              </g>
            </svg>
          </div>        

          <el-dropdown class="page-selector" @command="menuChanged">
            <div class="area-name">
              {{ area.name }}<i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="overview">Overview</el-dropdown-item>
              <el-dropdown-item v-for="(area, areaId) in areas" :key="areaId" :command="areaId">{{ area.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
                 
        </el-col>
        <!-- <el-col v-if="areaData" :span="6" style="min-width: 300px; text-align: right;">
          Global progress: {{ areaData.cycle.progress }}%
        </el-col>
        <el-col v-if="areaData" :span="6" style="min-width: 300px; text-align: right;">
          Epics: {{ areaData.cycle.epicsDoneCount }} / {{ areaData.cycle.epicsCount }}
        </el-col> -->
      </el-row>

      </el-header>

      <el-main 
        v-loading="loading"
        element-loading-background="#0a132d">

        <div v-if="error" class="error">{{ error }}</div>

        <div v-if="areaData" class="content">
          
          <el-row class="global-objectives" type="flex" justify="start">   

            <el-col :span="12" class="hidden-md-and-down">
              <div class="global-objectives__container">
                <div class="global-objectives__chart-container" style="transform: rotateY(180deg) rotateX(180deg)">
                  <apexchart class="global-objectives__chart global-objectives__chart_background" type="radialBar" height="100%" :options="options2" :series="series2"></apexchart>
                  <apexchart class="global-objectives__chart" type="radialBar" height="100%" :options="options" :series="series"></apexchart>              
                </div> 
                <div class="global-objectives__details">
                  <!-- <div class="global-objectives__details__title">Objectives</div> -->
                  <div>
                    <div class="global-objectives__detail" v-for="objective in areaData.objectives" :key="objective.name">
                      <div class="global-objectives__detail__progress">{{ objective.progress }}% <div class="global-objectives__detail__weeks"><strong>{{ objective.weeksDone }}</strong> of {{ objective.weeks }} weeks</div></div>
                      <div class="global-objectives__detail__name">{{ objective.name }}</div>                                
                    </div>                
                  </div>
                </div>       
              </div>                         
            </el-col>
            <el-col :md="24" :lg="12">
                <div class="global-objectives__progress">        
                  <div class="global-objectives__progress__row">
                      <div class="global-objectives__progress_value">{{ areaData.cycle.progress }}%</div>                
                      <div class="global-objectives__progress__title">Overall Progress</div>
                      <div class="global-objectives__progress__bar" v-bind:style="{'--percentage': areaData.cycle.progress + '%' }"></div>
                  </div>
                  
                  <div class="global-objectives__progress__row">
                    <div class="global-objectives__progress_value">{{ areaData.cycle.weeksDone }} of {{ areaData.cycle.weeks }} weeks</div>                
                    <div class="global-objectives__progress__title">Weeks Done</div>
                    <div class="global-objectives__progress__bar" v-bind:style="{'--percentage': areaData.cycle.progress + '%' }"></div>
                  </div>

                  <div class="global-objectives__progress__row">
                    <div class="global-objectives__progress_value">{{ areaData.cycle.epicsDoneCount }} of {{ areaData.cycle.epicsCount }} epics</div>                
                    <div class="global-objectives__progress__title">Epics Done</div>   
                    <div class="global-objectives__progress__bar" v-bind:style="{'--percentage': areaData.cycle.progressByEpics + '%' }"></div>               
                  </div>
                </div>                                 
            </el-col>
          </el-row>

          <el-row class="epic-container">
            <div class="epic-container-column">

              <template v-for="objective in areaData.objectives">
                <div class="epic-container-column__objective" :key="objective.name">
                  <div class="epic-container-column__objective__name">{{ objective.name }}</div>
                  <div class="epic-container-column__objective__percentage">{{ objective.progress }}%</div>
                </div>
                <div v-for="project in objective.projects" class="epic-container-column__project" :key="project.name">
                  <el-popover
                    :ref="project.name + 'popover'"
                    placement="bottom"
                    width="500"
                    :open-delay="300"
                    :visible-arrow="false"                    
                    popper-class="project-popover"
                    trigger="hover">
                    <el-container>
                      <el-main>
                        <el-row class="project-popover__header">  
                          <div class="project-popover__header__owner">{{ project.owner }}</div>
                          <div class="project-popover__header__name">{{ project.name }}</div>

                          <template v-if="project.weeks != project.weeksNotToDo">
                            <div class="project-popover__header__progress">{{ project.progress + '%' }}</div>
                            <div class="project-popover__header__weeks"><strong>{{ project.weeksDone }} </strong> of {{ project.weeks }} weeks</div>
                          </template>
                          <template v-else>
                            <div class="project-popover__header__progress">Cancelled</div>
                          </template>
                        </el-row>
                        <el-row class="project-popover__progress">
                          <div v-if="project.weeks != project.weeksNotToDo" class="progress-line" v-bind:style="{'--percentage': project.progress + '%', '--percentage-with-in-progress': project.progressWithInProgress + '%', '--percentage-not-to-do': project.percentageNotToDo + '%'}">
                            <div></div>
                          </div>
                        </el-row>
                        <el-row class="project-popover__epics">
                          <div v-bind:class="[{ 'project-popover__epic': true }, healthClassFromStatus(epic.status)]" v-for="epic in project.epics" :key="epic.name">
                            <div class="project-popover__epic__name">{{ epic.name }}</div>
                            <div class="project-popover__epic__effort">
                              {{ epic.effort }}
                              <span v-if="epic.effort <= 1">week</span>
                              <span v-else>weeks</span>
                            </div>
                            <div class="project-popover__epic__status">
                              {{ displayStatus(epic.status) }}
                            </div>
                          </div>         
                        </el-row>         
                      </el-main>           
                    </el-container>                       
                  </el-popover>                    
                    <el-container >
                      <el-main v-popover="project.name + 'popover'" class="epic-container-column__project__internal">
                        <el-row>
                          <div>
                            <div class="epic-container-column__project__title">{{ project.name }}</div>
                            <div v-if="project.weeks != project.weeksNotToDo" class="epic-container-column__project__epic-counts">
                              <strong>{{ project.weeksDone }}</strong> of {{ project.weeks }} wks
                            </div>
                            <div v-else class="epic-container-column__project__epic-counts">
                              Cancelled
                            </div>
                          </div>
                        </el-row>
                        <el-row>
                          <div>
                            <div class="progress-line" v-bind:style="{'--percentage': project.progress + '%', '--percentage-with-in-progress': project.progressWithInProgress + '%', '--percentage-not-to-do': project.percentageNotToDo + '%'}">
                              <div></div>
                            </div>
                            <div v-if="project.progress == 100" class="progress-percentage done"><i class="el-icon-trophy"></i>100%</div>
                            <div v-else class="progress-percentage">{{ project.progress }}%</div>
                          </div>                    
                        </el-row>         
                      </el-main>           
                    </el-container>                       
                  
                      
                </div>                            
              </template>
            </div>
          </el-row>

        </div>
      </el-main>
    </el-container>

</template>

<script>
import areaConfigs from "../../config/areas";
import AreaData from "../libraries/areaData"

export default {
  name: "Area",
  data() {
    return {
      areas: null,
      
      loading: false,
      areaData: null,
      error: null,
      areaId: "",
      area: null,
      areaName: "",

      options: {        
        chart: {
          
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
              background: '#11264a',
              strokeWidth: '0%',
              opacity: 1,
              margin: 5,
            },            
            hollow: {
              margin: 50,
              size: '40%',
              background: 'transparent',
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
                  show: false,                      
              },
              value: {
                  show: false,
              },            
            },
          }  
        },        
        colors: ['#d3dc2d', '#56c5c9', '#6879ae'],        
        labels: ['We drive business growth', 'We fight attrition', 'We are vertical agnostic'],
        fill: {
          opacity: 1,      
        },        
      },

      options2: {        
        chart: {
          animations: {
            enabled: false,
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
              background: 'transparent',
              strokeWidth: '0%',
              opacity: 1,
              margin: 5,
            },            
            hollow: {
              margin: 50,
              size: '40%',
              background: 'transparent',
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
                  show: false,                      
              },
              value: {
                  show: false,
              },            
            },
          }  
        },        
        colors: ['#102649', '#102649', '#102649'],        
        fill: {
          opacity: 1,      
        },        
      },

      series: [75,23,10],
      series2: [100,40,25]
      
    };
  },
  created() {
    this.areas = areaConfigs;
    this.initialize();
  },
  watch: {
    $route: "initialize" // call again the method if the route changes
  },
  methods: {
    async initialize() {
      this.areaId = this.$route.params.areaId;
      if (!areaConfigs[this.areaId]) {
        this.error = "No such Area definition";
      } else {
        this.area = this.areas[this.areaId];
        await this.fetchData();
      }
    },

    async fetchData() {
      this.error = null;
      this.loading = true;

      try {
        this.areaData = (await AreaData.create(this.area.urlIdentifier)).sortedByObjectiveLength();

        let objectives = this.areaData.objectives.map((objective) => {
          return {
            name: objective.name,
            weeks: objective.weeks,
            progress: objective.progress
          };
        });

        console.dir(objectives);

        let longestObjective = objectives[0];
        objectives = objectives.map((objective, i) => {
          let relativeModifierToLongest = objective.weeks / longestObjective.weeks;

          let trackLength = Math.ceil(relativeModifierToLongest * 100 * 1.1);
          if (trackLength < 10) trackLength *= 3;
          else if (trackLength < 50) trackLength *= 1.5;
          if (trackLength > 100) trackLength = 100;

          let progressOnTrack = Math.ceil(objective.progress / 100 * trackLength);

          return {
            name: objective.name,
            weeks: objective.weeks,
            progress: objective.progress,
            trackLength,
            progressOnTrack
          };
        });

        this.series2 = objectives.map((objective) => objective.trackLength);
        this.series = objectives.map((objective) => objective.progressOnTrack);

        console.dir(objectives);



      } catch (e) {
        console.error('Error on loading Area data', e);
        this.error = "Error :(";
      }

      this.loading = false;
    },

    menuChanged(changeTo) {
      if (changeTo == 'overview') this.$router.push({ path: "/" });
      else this.$router.push({ path: "/area/" + changeTo });
    },

    displayStatus(status) {
      if (status == 'todo') return 'To Do';
      else if (status == 'inprogress') return 'In Progress';
      else if (status == 'done') return 'Done';
      else if (status == 'postponed') return 'Postponed';
      else if (status == 'cancelled') return 'Cancelled';
      else if (status == 'replanned') return 'Replanned';
      return '-';      
    },

    healthClassFromStatus(status) {
      if (status == 'todo') return 'health-normal';
      else if (status == 'inprogress') return 'health-good';
      else if (status == 'done') return 'health-best';
      else if (status == 'postponed') return 'health-bad';
      else if (status == 'cancelled') return 'health-bad';
      else if (status == 'replanned') return 'health-forget';
      return '';
    } 
  }
  
};
</script>
