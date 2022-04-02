import Chart from 'chart.js/auto';
import {DateTime} from 'luxon';
import 'chartjs-adapter-luxon';
import './style.css'


async function fetchData(url){
  const response = await fetch(url);

  if (!response.ok){
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data =  await response.json();
  return data;
}

const ctx = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('ig_reach_chart').getContext('2d');
const ctx3 = document.getElementById('ig_impression_chart').getContext('2d');
const ctx4 = document.getElementById('fb_engaged_user_chart').getContext('2d');
const ctx5 = document.getElementById('fb_impression_chart').getContext('2d');

const insightData = {
  labels: [],
  datasets: [{
      data: [],
      backgroundColor: 'rgb(193, 53, 132)',
      borderColor: 'rgb(225, 48, 108)',
      borderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 100
  }]
};

const insightData2 = {
  labels: [],
  datasets: [{
      data: [],
      backgroundColor: 'rgb(193, 53, 132)',
      borderColor: 'rgb(225, 48, 108)',
      borderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 100
  }]
};

const insightData3 = {
  labels: [],
  datasets: [{
      data: [],
      backgroundColor: 'rgb(66, 103, 178)',
      borderColor: 'rgb(66, 103, 178)',
      borderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 100
  }]
};

const insightData4 = {
  labels: [],
  datasets: [{
      data: [],
      backgroundColor: 'rgb(66, 103, 178)',
      borderColor: 'rgb(66, 103, 178)',
      borderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 100
  }]
};

const insightOptions = {
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      time: {
        unit: 'week'
      },
      type: 'time',
      grid: {
        display: false
      }
    },
    y: {
      title: {
        display: true,
        text: 'reach'
      }
    }
  }
};

const insightOptions2 = {
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      time: {
        unit: 'week'
      },
      type: 'time',
      grid: {
        display: false
      }
    },
    y: {
      title: {
        display: true,
        text: 'impressions'
      }
    }
  }
};

const insightOptions3 = {
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      time: {
        unit: 'week'
      },
      type: 'time',
      grid: {
        display: false
      }
    },
    y: {
      title: {
        display: true,
        text: 'engaged users'
      }
    }
  }
};

const insightOptions4 = {
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      time: {
        unit: 'week'
      },
      type: 'time',
      grid: {
        display: false
      }
    },
    y: {
      title: {
        display: true,
        text: 'impressions'
      }
    }
  }
};

const followerCountData = {
  labels: [],
  datasets: [
    {
      label: 'Instagram',
      data: [],
      fill: false,
      backgroundColor: 'rgb(193, 53, 132)',
      borderColor: 'rgb(225, 48, 108)',
      tension: 0.1,
      borderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 100
    },
    {
      label: 'Facebook',
      data: [],
      fill: false,
      backgroundColor: 'rgb(66, 103, 178)',
      borderColor: 'rgb(66, 103, 178)',
      tension: 0.1,
      borderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 100
    }
  ]
};

const followerCountOptions = {
  responsive: true,
  plugins: {
    legend: {
      align: 'end'
    }
  },
  scales: {
    x: {
      type: 'time',
      grid: {
        display: false
      },
      time: {
        unit: 'week'
      }
    },
    y: {
      title: {
        display: true,
        text: 'followers'
      }
    }
  }
};


const myChart = new Chart(ctx,{type: 'line', data: followerCountData, options: followerCountOptions});
const myChart2 = new Chart(ctx2,{type: 'line', data: insightData, options: insightOptions});
const myChart3 = new Chart(ctx3,{type: 'line', data: insightData2, options: insightOptions2});
const myChart4 = new Chart(ctx4,{type: 'line', data: insightData3, options: insightOptions3});
const myChart5 = new Chart(ctx5,{type: 'line', data: insightData4, options: insightOptions4});

function calculateWeeklyGrowth(array){
  if (array.length > 1){
    return Math.round((array[array.length - 1]/array[array.length - 2] - 1) * 100)
  }else{
    return 0;
  }
}

function updateGrowthPercentage(percentage, elementID){
  if (percentage > 0){
    document.getElementById(elementID).innerHTML = `▲ ${percentage}%`;
    document.getElementById(elementID).style.color = '#10e021';
  }else if(percentage === 0){
    document.getElementById(elementID).innerHTML = `⧎ ${percentage}%`;
    document.getElementById(elementID).style.color = '#787878';
  }else{
    document.getElementById(elementID).innerHTML = `▼ ${percentage}%`;
    document.getElementById(elementID).style.color = '#eb4034';
  }
}

fetchData('https://real-sheet-26ui5cq6.wl.gateway.dev/display_data?source=follower_counts').then(
  (sheetJSON)=>{
    followerCountData.labels = sheetJSON.values[0].map(x => DateTime.fromISO(x).toJSDate());
    followerCountData.datasets[0].data = sheetJSON.values[1].map(x => parseInt(x));
    followerCountData.datasets[1].data = sheetJSON.values[2].map(x => parseInt(x));
    myChart.update();
});


fetchData('https://real-sheet-26ui5cq6.wl.gateway.dev/display_data?source=insights').then(
  sheetJSON=>{
    insightData.labels = sheetJSON.values[0].map(x => DateTime.fromISO(x).toJSDate());
    insightData.datasets[0].data = sheetJSON.values[1].map(x => parseInt(x));
    insightData2.labels = sheetJSON.values[0].map(x => DateTime.fromISO(x).toJSDate());
    insightData2.datasets[0].data = sheetJSON.values[2].map(x => parseInt(x));
    insightData3.labels = sheetJSON.values[0].map(x => DateTime.fromISO(x).toJSDate());
    insightData3.datasets[0].data = sheetJSON.values[3].map(x => parseInt(x));
    insightData4.labels = sheetJSON.values[0].map(x => DateTime.fromISO(x).toJSDate());
    insightData4.datasets[0].data = sheetJSON.values[4].map(x => parseInt(x));

    myChart2.update();
    myChart3.update();
    myChart4.update();
    myChart5.update();

    updateGrowthPercentage(calculateWeeklyGrowth(sheetJSON.values[5]),'fb-page-view-rate');
    updateGrowthPercentage(calculateWeeklyGrowth(sheetJSON.values[2]),'ig-impression-rate');
    updateGrowthPercentage(calculateWeeklyGrowth(sheetJSON.values[3]),'fb-eg-user-rate');
    updateGrowthPercentage(calculateWeeklyGrowth(sheetJSON.values[1]),'ig-reach-rate');
    
    [...document.querySelectorAll('.skeleton-text')].map(x =>{ x.classList.remove('skeleton-text');});
    [...document.querySelectorAll('.skeleton')].map(x =>{ x.classList.remove('skeleton');});
    [...document.querySelectorAll('.chart')].map(x =>{ x.style.visibility = 'visible';});
    [...document.querySelectorAll('.chart-title-text')].map(x =>{ x.style.visibility = 'visible';});
    [...document.querySelectorAll('.card-p-text')].map(x =>{ x.style.visibility = 'visible';});
  }
)


