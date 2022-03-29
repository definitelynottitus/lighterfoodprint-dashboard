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
      backgroundColor: 'rgba(82, 186, 92, 1)',
      borderColor: 'rgb(82, 186, 92, 1)',
      borderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 100
  }]
};

const insightData2 = {
  labels: [],
  datasets: [{
      data: [],
      backgroundColor: 'rgba(82, 186, 92, 1)',
      borderColor: 'rgb(82, 186, 92, 1)',
      borderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 100
  }]
};

const insightData3 = {
  labels: [],
  datasets: [{
      data: [],
      backgroundColor: 'rgb(66, 103, 178)'
  }]
};

const insightData4 = {
  labels: [],
  datasets: [{
      data: [],
      backgroundColor: 'rgb(66, 103, 178)'
  }]
};

const insightOptions = {
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Insights',
      align: 'start',
      font: {
        size: 18
      }
    }
  },
  scales: {
    x: {
      time: {
        unit: 'week'
      },
      type: 'time',
      offset: true,
      title: {
        display: true,
        text: 'Date'
      },
      grid: {
        display: false
      }
    },
    y: {
      title: {
        display: true,
        text: 'text'
      }
    }
  }
};

const insightOptions2 = {
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Insights',
      align: 'start',
      font: {
        size: 18
      }
    }
  },
  scales: {
    x: {
      time: {
        unit: 'week'
      },
      type: 'time',
      offset: true,
      title: {
        display: true,
        text: 'Date'
      },
      grid: {
        display: false
      }
    },
    y: {
      title: {
        display: true,
        text: 'text'
      }
    }
  }
};

const insightOptions3 = {
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Insights',
      align: 'start',
      font: {
        size: 18
      }
    }
  },
  scales: {
    x: {
      time: {
        unit: 'week'
      },
      type: 'time',
      offset: true,
      title: {
        display: true,
        text: 'Date'
      },
      grid: {
        display: false
      }
    },
    y: {
      title: {
        display: true,
        text: 'text'
      }
    }
  }
};

const insightOptions4 = {
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Insights',
      align: 'start',
      font: {
        size: 18
      }
    }
  },
  scales: {
    x: {
      time: {
        unit: 'week'
      },
      type: 'time',
      offset: true,
      title: {
        display: true,
        text: 'Date'
      },
      grid: {
        display: false
      }
    },
    y: {
      title: {
        display: true,
        text: 'text'
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
    title: {
      display: true,
      text: 'Total Followers over Time',
      align: 'start',
      font: {
        size: 22
      }
    },
    legend: {
      align: 'end'
    }
  },
  scales: {
    x: {
      type: 'time',
      title: {
        display: true,
        text: 'Date'
      },
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
const myChart4 = new Chart(ctx4,{type: 'bar', data: insightData3, options: insightOptions3});
const myChart5 = new Chart(ctx5,{type: 'bar', data: insightData4, options: insightOptions4});



fetchData('https://real-sheet-26ui5cq6.wl.gateway.dev/display_data?source=follower_counts').then(
  (sheetJSON)=>{
    followerCountData.labels = sheetJSON.values[0].map(x => DateTime.fromISO(x).toJSDate());
    followerCountData.datasets[0].data = sheetJSON.values[1].map(x => parseInt(x));
    followerCountData.datasets[1].data = sheetJSON.values[2].map(x => parseInt(x));
    myChart.update();
    document.getElementById('myChart').style.visibility = 'visible';
    document.querySelector('.chart-container').classList.remove('skeleton');
});


fetchData('https://real-sheet-26ui5cq6.wl.gateway.dev/display_data?source=insights').then(
  sheetJSON=>{
    insightData.labels = sheetJSON.values[0].map(x => DateTime.fromISO(x).toJSDate());
    insightData.datasets[0].data = sheetJSON.values[1].map(x => parseInt(x));
    insightOptions.plugins.title.text = 'Instagram Reach over Time';
    insightOptions.scales.y.title.text = 'reach';
    myChart2.update();
    document.getElementById('ig_reach_chart').style.visibility = 'visible';
    document.getElementById('item1').classList.remove('skeleton');
    insightData2.labels = sheetJSON.values[0].map(x => DateTime.fromISO(x).toJSDate());
    insightData2.datasets[0].data = sheetJSON.values[2].map(x => parseInt(x));
    insightOptions2.plugins.title.text = 'Instagram Impression over Time'
    insightOptions2.scales.y.title.text = 'impressions';
    myChart3.update();
    document.getElementById('ig_impression_chart').style.visibility = 'visible';
    document.getElementById('item2').classList.remove('skeleton');
    insightData3.labels = sheetJSON.values[0].map(x => DateTime.fromISO(x).toJSDate());
    insightData3.datasets[0].data = sheetJSON.values[3].map(x => parseInt(x));
    insightOptions3.plugins.title.text = 'Facebook Page Engaged Users over Time'
    insightOptions3.scales.y.title.text = 'engaged users';
    myChart4.update();
    document.getElementById('fb_engaged_user_chart').style.visibility = 'visible';
    document.getElementById('item3').classList.remove('skeleton');
    insightData4.labels = sheetJSON.values[0].map(x => DateTime.fromISO(x).toJSDate());
    insightData4.datasets[0].data = sheetJSON.values[4].map(x => parseInt(x));
    insightOptions4.plugins.title.text = 'Facebook Page Impression over Time'
    insightOptions4.scales.y.title.text = 'impressions';
    myChart5.update();
    document.getElementById('fb_impression_chart').style.visibility = 'visible';
    document.getElementById('item4').classList.remove('skeleton');

  }
)


