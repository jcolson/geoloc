/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 105.0, "minX": 0.0, "maxY": 40594.0, "series": [{"data": [[0.0, 105.0], [0.1, 108.0], [0.2, 109.0], [0.3, 110.0], [0.4, 110.0], [0.5, 110.0], [0.6, 110.0], [0.7, 111.0], [0.8, 111.0], [0.9, 111.0], [1.0, 111.0], [1.1, 111.0], [1.2, 111.0], [1.3, 112.0], [1.4, 112.0], [1.5, 112.0], [1.6, 112.0], [1.7, 112.0], [1.8, 112.0], [1.9, 112.0], [2.0, 112.0], [2.1, 112.0], [2.2, 112.0], [2.3, 112.0], [2.4, 113.0], [2.5, 113.0], [2.6, 113.0], [2.7, 113.0], [2.8, 113.0], [2.9, 113.0], [3.0, 113.0], [3.1, 113.0], [3.2, 113.0], [3.3, 113.0], [3.4, 113.0], [3.5, 113.0], [3.6, 113.0], [3.7, 113.0], [3.8, 113.0], [3.9, 113.0], [4.0, 113.0], [4.1, 114.0], [4.2, 114.0], [4.3, 114.0], [4.4, 114.0], [4.5, 114.0], [4.6, 114.0], [4.7, 114.0], [4.8, 114.0], [4.9, 114.0], [5.0, 114.0], [5.1, 114.0], [5.2, 114.0], [5.3, 114.0], [5.4, 114.0], [5.5, 114.0], [5.6, 114.0], [5.7, 114.0], [5.8, 114.0], [5.9, 114.0], [6.0, 114.0], [6.1, 114.0], [6.2, 114.0], [6.3, 114.0], [6.4, 114.0], [6.5, 114.0], [6.6, 114.0], [6.7, 115.0], [6.8, 115.0], [6.9, 115.0], [7.0, 115.0], [7.1, 115.0], [7.2, 115.0], [7.3, 115.0], [7.4, 115.0], [7.5, 115.0], [7.6, 115.0], [7.7, 115.0], [7.8, 115.0], [7.9, 115.0], [8.0, 115.0], [8.1, 115.0], [8.2, 115.0], [8.3, 115.0], [8.4, 115.0], [8.5, 115.0], [8.6, 115.0], [8.7, 115.0], [8.8, 115.0], [8.9, 115.0], [9.0, 115.0], [9.1, 115.0], [9.2, 115.0], [9.3, 115.0], [9.4, 115.0], [9.5, 115.0], [9.6, 115.0], [9.7, 115.0], [9.8, 115.0], [9.9, 115.0], [10.0, 116.0], [10.1, 116.0], [10.2, 116.0], [10.3, 116.0], [10.4, 116.0], [10.5, 116.0], [10.6, 116.0], [10.7, 116.0], [10.8, 116.0], [10.9, 116.0], [11.0, 116.0], [11.1, 116.0], [11.2, 116.0], [11.3, 116.0], [11.4, 116.0], [11.5, 116.0], [11.6, 116.0], [11.7, 116.0], [11.8, 116.0], [11.9, 116.0], [12.0, 116.0], [12.1, 116.0], [12.2, 116.0], [12.3, 116.0], [12.4, 116.0], [12.5, 116.0], [12.6, 116.0], [12.7, 116.0], [12.8, 116.0], [12.9, 116.0], [13.0, 116.0], [13.1, 116.0], [13.2, 116.0], [13.3, 116.0], [13.4, 116.0], [13.5, 116.0], [13.6, 116.0], [13.7, 116.0], [13.8, 116.0], [13.9, 116.0], [14.0, 116.0], [14.1, 117.0], [14.2, 117.0], [14.3, 117.0], [14.4, 117.0], [14.5, 117.0], [14.6, 117.0], [14.7, 117.0], [14.8, 117.0], [14.9, 117.0], [15.0, 117.0], [15.1, 117.0], [15.2, 117.0], [15.3, 117.0], [15.4, 117.0], [15.5, 117.0], [15.6, 117.0], [15.7, 117.0], [15.8, 117.0], [15.9, 117.0], [16.0, 117.0], [16.1, 117.0], [16.2, 117.0], [16.3, 117.0], [16.4, 117.0], [16.5, 117.0], [16.6, 117.0], [16.7, 117.0], [16.8, 117.0], [16.9, 117.0], [17.0, 117.0], [17.1, 117.0], [17.2, 117.0], [17.3, 117.0], [17.4, 117.0], [17.5, 117.0], [17.6, 117.0], [17.7, 117.0], [17.8, 117.0], [17.9, 117.0], [18.0, 117.0], [18.1, 117.0], [18.2, 117.0], [18.3, 117.0], [18.4, 117.0], [18.5, 117.0], [18.6, 117.0], [18.7, 117.0], [18.8, 118.0], [18.9, 118.0], [19.0, 118.0], [19.1, 118.0], [19.2, 118.0], [19.3, 118.0], [19.4, 118.0], [19.5, 118.0], [19.6, 118.0], [19.7, 118.0], [19.8, 118.0], [19.9, 118.0], [20.0, 118.0], [20.1, 118.0], [20.2, 118.0], [20.3, 118.0], [20.4, 118.0], [20.5, 118.0], [20.6, 118.0], [20.7, 118.0], [20.8, 118.0], [20.9, 118.0], [21.0, 118.0], [21.1, 118.0], [21.2, 118.0], [21.3, 118.0], [21.4, 118.0], [21.5, 118.0], [21.6, 118.0], [21.7, 118.0], [21.8, 118.0], [21.9, 118.0], [22.0, 118.0], [22.1, 118.0], [22.2, 118.0], [22.3, 118.0], [22.4, 118.0], [22.5, 118.0], [22.6, 118.0], [22.7, 118.0], [22.8, 118.0], [22.9, 118.0], [23.0, 118.0], [23.1, 118.0], [23.2, 118.0], [23.3, 118.0], [23.4, 118.0], [23.5, 118.0], [23.6, 118.0], [23.7, 118.0], [23.8, 118.0], [23.9, 118.0], [24.0, 119.0], [24.1, 119.0], [24.2, 119.0], [24.3, 119.0], [24.4, 119.0], [24.5, 119.0], [24.6, 119.0], [24.7, 119.0], [24.8, 119.0], [24.9, 119.0], [25.0, 119.0], [25.1, 119.0], [25.2, 119.0], [25.3, 119.0], [25.4, 119.0], [25.5, 119.0], [25.6, 119.0], [25.7, 119.0], [25.8, 119.0], [25.9, 119.0], [26.0, 119.0], [26.1, 119.0], [26.2, 119.0], [26.3, 119.0], [26.4, 119.0], [26.5, 119.0], [26.6, 119.0], [26.7, 119.0], [26.8, 119.0], [26.9, 119.0], [27.0, 119.0], [27.1, 119.0], [27.2, 119.0], [27.3, 119.0], [27.4, 119.0], [27.5, 119.0], [27.6, 119.0], [27.7, 119.0], [27.8, 119.0], [27.9, 119.0], [28.0, 119.0], [28.1, 119.0], [28.2, 119.0], [28.3, 119.0], [28.4, 119.0], [28.5, 119.0], [28.6, 119.0], [28.7, 119.0], [28.8, 119.0], [28.9, 119.0], [29.0, 119.0], [29.1, 119.0], [29.2, 120.0], [29.3, 120.0], [29.4, 120.0], [29.5, 120.0], [29.6, 120.0], [29.7, 120.0], [29.8, 120.0], [29.9, 120.0], [30.0, 120.0], [30.1, 120.0], [30.2, 120.0], [30.3, 120.0], [30.4, 120.0], [30.5, 120.0], [30.6, 120.0], [30.7, 120.0], [30.8, 120.0], [30.9, 120.0], [31.0, 120.0], [31.1, 120.0], [31.2, 120.0], [31.3, 120.0], [31.4, 120.0], [31.5, 120.0], [31.6, 120.0], [31.7, 120.0], [31.8, 120.0], [31.9, 120.0], [32.0, 120.0], [32.1, 120.0], [32.2, 120.0], [32.3, 120.0], [32.4, 120.0], [32.5, 120.0], [32.6, 120.0], [32.7, 120.0], [32.8, 120.0], [32.9, 120.0], [33.0, 120.0], [33.1, 120.0], [33.2, 120.0], [33.3, 120.0], [33.4, 120.0], [33.5, 120.0], [33.6, 120.0], [33.7, 120.0], [33.8, 120.0], [33.9, 120.0], [34.0, 120.0], [34.1, 120.0], [34.2, 120.0], [34.3, 120.0], [34.4, 121.0], [34.5, 121.0], [34.6, 121.0], [34.7, 121.0], [34.8, 121.0], [34.9, 121.0], [35.0, 121.0], [35.1, 121.0], [35.2, 121.0], [35.3, 121.0], [35.4, 121.0], [35.5, 121.0], [35.6, 121.0], [35.7, 121.0], [35.8, 121.0], [35.9, 121.0], [36.0, 121.0], [36.1, 121.0], [36.2, 121.0], [36.3, 121.0], [36.4, 121.0], [36.5, 121.0], [36.6, 121.0], [36.7, 121.0], [36.8, 121.0], [36.9, 121.0], [37.0, 121.0], [37.1, 121.0], [37.2, 121.0], [37.3, 121.0], [37.4, 121.0], [37.5, 121.0], [37.6, 121.0], [37.7, 121.0], [37.8, 121.0], [37.9, 121.0], [38.0, 121.0], [38.1, 121.0], [38.2, 121.0], [38.3, 121.0], [38.4, 121.0], [38.5, 121.0], [38.6, 121.0], [38.7, 121.0], [38.8, 121.0], [38.9, 121.0], [39.0, 121.0], [39.1, 121.0], [39.2, 121.0], [39.3, 122.0], [39.4, 122.0], [39.5, 122.0], [39.6, 122.0], [39.7, 122.0], [39.8, 122.0], [39.9, 122.0], [40.0, 122.0], [40.1, 122.0], [40.2, 122.0], [40.3, 122.0], [40.4, 122.0], [40.5, 122.0], [40.6, 122.0], [40.7, 122.0], [40.8, 122.0], [40.9, 122.0], [41.0, 122.0], [41.1, 122.0], [41.2, 122.0], [41.3, 122.0], [41.4, 122.0], [41.5, 122.0], [41.6, 122.0], [41.7, 122.0], [41.8, 122.0], [41.9, 122.0], [42.0, 122.0], [42.1, 122.0], [42.2, 122.0], [42.3, 122.0], [42.4, 122.0], [42.5, 122.0], [42.6, 122.0], [42.7, 122.0], [42.8, 122.0], [42.9, 122.0], [43.0, 122.0], [43.1, 122.0], [43.2, 122.0], [43.3, 122.0], [43.4, 122.0], [43.5, 122.0], [43.6, 122.0], [43.7, 122.0], [43.8, 122.0], [43.9, 123.0], [44.0, 123.0], [44.1, 123.0], [44.2, 123.0], [44.3, 123.0], [44.4, 123.0], [44.5, 123.0], [44.6, 123.0], [44.7, 123.0], [44.8, 123.0], [44.9, 123.0], [45.0, 123.0], [45.1, 123.0], [45.2, 123.0], [45.3, 123.0], [45.4, 123.0], [45.5, 123.0], [45.6, 123.0], [45.7, 123.0], [45.8, 123.0], [45.9, 123.0], [46.0, 123.0], [46.1, 123.0], [46.2, 123.0], [46.3, 123.0], [46.4, 123.0], [46.5, 123.0], [46.6, 123.0], [46.7, 123.0], [46.8, 123.0], [46.9, 123.0], [47.0, 123.0], [47.1, 123.0], [47.2, 123.0], [47.3, 123.0], [47.4, 123.0], [47.5, 123.0], [47.6, 123.0], [47.7, 123.0], [47.8, 123.0], [47.9, 123.0], [48.0, 123.0], [48.1, 123.0], [48.2, 124.0], [48.3, 124.0], [48.4, 124.0], [48.5, 124.0], [48.6, 124.0], [48.7, 124.0], [48.8, 124.0], [48.9, 124.0], [49.0, 124.0], [49.1, 124.0], [49.2, 124.0], [49.3, 124.0], [49.4, 124.0], [49.5, 124.0], [49.6, 124.0], [49.7, 124.0], [49.8, 124.0], [49.9, 124.0], [50.0, 124.0], [50.1, 124.0], [50.2, 124.0], [50.3, 124.0], [50.4, 124.0], [50.5, 124.0], [50.6, 124.0], [50.7, 124.0], [50.8, 124.0], [50.9, 124.0], [51.0, 124.0], [51.1, 124.0], [51.2, 124.0], [51.3, 124.0], [51.4, 124.0], [51.5, 124.0], [51.6, 124.0], [51.7, 124.0], [51.8, 124.0], [51.9, 124.0], [52.0, 124.0], [52.1, 124.0], [52.2, 125.0], [52.3, 125.0], [52.4, 125.0], [52.5, 125.0], [52.6, 125.0], [52.7, 125.0], [52.8, 125.0], [52.9, 125.0], [53.0, 125.0], [53.1, 125.0], [53.2, 125.0], [53.3, 125.0], [53.4, 125.0], [53.5, 125.0], [53.6, 125.0], [53.7, 125.0], [53.8, 125.0], [53.9, 125.0], [54.0, 125.0], [54.1, 125.0], [54.2, 125.0], [54.3, 125.0], [54.4, 125.0], [54.5, 125.0], [54.6, 125.0], [54.7, 125.0], [54.8, 125.0], [54.9, 125.0], [55.0, 125.0], [55.1, 125.0], [55.2, 125.0], [55.3, 125.0], [55.4, 125.0], [55.5, 125.0], [55.6, 125.0], [55.7, 125.0], [55.8, 126.0], [55.9, 126.0], [56.0, 126.0], [56.1, 126.0], [56.2, 126.0], [56.3, 126.0], [56.4, 126.0], [56.5, 126.0], [56.6, 126.0], [56.7, 126.0], [56.8, 126.0], [56.9, 126.0], [57.0, 126.0], [57.1, 126.0], [57.2, 126.0], [57.3, 126.0], [57.4, 126.0], [57.5, 126.0], [57.6, 126.0], [57.7, 126.0], [57.8, 126.0], [57.9, 126.0], [58.0, 126.0], [58.1, 126.0], [58.2, 126.0], [58.3, 126.0], [58.4, 126.0], [58.5, 126.0], [58.6, 126.0], [58.7, 126.0], [58.8, 126.0], [58.9, 126.0], [59.0, 126.0], [59.1, 126.0], [59.2, 126.0], [59.3, 127.0], [59.4, 127.0], [59.5, 127.0], [59.6, 127.0], [59.7, 127.0], [59.8, 127.0], [59.9, 127.0], [60.0, 127.0], [60.1, 127.0], [60.2, 127.0], [60.3, 127.0], [60.4, 127.0], [60.5, 127.0], [60.6, 127.0], [60.7, 127.0], [60.8, 127.0], [60.9, 127.0], [61.0, 127.0], [61.1, 127.0], [61.2, 127.0], [61.3, 127.0], [61.4, 127.0], [61.5, 127.0], [61.6, 127.0], [61.7, 127.0], [61.8, 127.0], [61.9, 127.0], [62.0, 127.0], [62.1, 127.0], [62.2, 127.0], [62.3, 127.0], [62.4, 128.0], [62.5, 128.0], [62.6, 128.0], [62.7, 128.0], [62.8, 128.0], [62.9, 128.0], [63.0, 128.0], [63.1, 128.0], [63.2, 128.0], [63.3, 128.0], [63.4, 128.0], [63.5, 128.0], [63.6, 128.0], [63.7, 128.0], [63.8, 128.0], [63.9, 128.0], [64.0, 128.0], [64.1, 128.0], [64.2, 128.0], [64.3, 128.0], [64.4, 128.0], [64.5, 128.0], [64.6, 128.0], [64.7, 128.0], [64.8, 128.0], [64.9, 128.0], [65.0, 128.0], [65.1, 128.0], [65.2, 128.0], [65.3, 129.0], [65.4, 129.0], [65.5, 129.0], [65.6, 129.0], [65.7, 129.0], [65.8, 129.0], [65.9, 129.0], [66.0, 129.0], [66.1, 129.0], [66.2, 129.0], [66.3, 129.0], [66.4, 129.0], [66.5, 129.0], [66.6, 129.0], [66.7, 129.0], [66.8, 129.0], [66.9, 129.0], [67.0, 129.0], [67.1, 129.0], [67.2, 129.0], [67.3, 129.0], [67.4, 129.0], [67.5, 129.0], [67.6, 129.0], [67.7, 129.0], [67.8, 129.0], [67.9, 130.0], [68.0, 130.0], [68.1, 130.0], [68.2, 130.0], [68.3, 130.0], [68.4, 130.0], [68.5, 130.0], [68.6, 130.0], [68.7, 130.0], [68.8, 130.0], [68.9, 130.0], [69.0, 130.0], [69.1, 130.0], [69.2, 130.0], [69.3, 130.0], [69.4, 130.0], [69.5, 130.0], [69.6, 130.0], [69.7, 130.0], [69.8, 130.0], [69.9, 130.0], [70.0, 130.0], [70.1, 130.0], [70.2, 130.0], [70.3, 131.0], [70.4, 131.0], [70.5, 131.0], [70.6, 131.0], [70.7, 131.0], [70.8, 131.0], [70.9, 131.0], [71.0, 131.0], [71.1, 131.0], [71.2, 131.0], [71.3, 131.0], [71.4, 131.0], [71.5, 131.0], [71.6, 131.0], [71.7, 131.0], [71.8, 131.0], [71.9, 131.0], [72.0, 131.0], [72.1, 131.0], [72.2, 131.0], [72.3, 131.0], [72.4, 132.0], [72.5, 132.0], [72.6, 132.0], [72.7, 132.0], [72.8, 132.0], [72.9, 132.0], [73.0, 132.0], [73.1, 132.0], [73.2, 132.0], [73.3, 132.0], [73.4, 132.0], [73.5, 132.0], [73.6, 132.0], [73.7, 132.0], [73.8, 132.0], [73.9, 132.0], [74.0, 132.0], [74.1, 132.0], [74.2, 132.0], [74.3, 133.0], [74.4, 133.0], [74.5, 133.0], [74.6, 133.0], [74.7, 133.0], [74.8, 133.0], [74.9, 133.0], [75.0, 133.0], [75.1, 133.0], [75.2, 133.0], [75.3, 133.0], [75.4, 133.0], [75.5, 133.0], [75.6, 133.0], [75.7, 133.0], [75.8, 133.0], [75.9, 133.0], [76.0, 134.0], [76.1, 134.0], [76.2, 134.0], [76.3, 134.0], [76.4, 134.0], [76.5, 134.0], [76.6, 134.0], [76.7, 134.0], [76.8, 134.0], [76.9, 134.0], [77.0, 134.0], [77.1, 134.0], [77.2, 134.0], [77.3, 134.0], [77.4, 134.0], [77.5, 135.0], [77.6, 135.0], [77.7, 135.0], [77.8, 135.0], [77.9, 135.0], [78.0, 135.0], [78.1, 135.0], [78.2, 135.0], [78.3, 135.0], [78.4, 135.0], [78.5, 135.0], [78.6, 135.0], [78.7, 135.0], [78.8, 136.0], [78.9, 136.0], [79.0, 136.0], [79.1, 136.0], [79.2, 136.0], [79.3, 136.0], [79.4, 136.0], [79.5, 136.0], [79.6, 136.0], [79.7, 136.0], [79.8, 136.0], [79.9, 136.0], [80.0, 137.0], [80.1, 137.0], [80.2, 137.0], [80.3, 137.0], [80.4, 137.0], [80.5, 137.0], [80.6, 137.0], [80.7, 137.0], [80.8, 137.0], [80.9, 137.0], [81.0, 137.0], [81.1, 138.0], [81.2, 138.0], [81.3, 138.0], [81.4, 138.0], [81.5, 138.0], [81.6, 138.0], [81.7, 138.0], [81.8, 138.0], [81.9, 139.0], [82.0, 139.0], [82.1, 139.0], [82.2, 139.0], [82.3, 139.0], [82.4, 139.0], [82.5, 139.0], [82.6, 139.0], [82.7, 140.0], [82.8, 140.0], [82.9, 140.0], [83.0, 140.0], [83.1, 140.0], [83.2, 140.0], [83.3, 140.0], [83.4, 141.0], [83.5, 141.0], [83.6, 141.0], [83.7, 141.0], [83.8, 141.0], [83.9, 141.0], [84.0, 142.0], [84.1, 142.0], [84.2, 142.0], [84.3, 142.0], [84.4, 142.0], [84.5, 142.0], [84.6, 143.0], [84.7, 143.0], [84.8, 143.0], [84.9, 143.0], [85.0, 144.0], [85.1, 144.0], [85.2, 144.0], [85.3, 144.0], [85.4, 145.0], [85.5, 145.0], [85.6, 145.0], [85.7, 145.0], [85.8, 146.0], [85.9, 146.0], [86.0, 146.0], [86.1, 147.0], [86.2, 147.0], [86.3, 147.0], [86.4, 148.0], [86.5, 148.0], [86.6, 148.0], [86.7, 149.0], [86.8, 150.0], [86.9, 150.0], [87.0, 151.0], [87.1, 151.0], [87.2, 152.0], [87.3, 152.0], [87.4, 153.0], [87.5, 154.0], [87.6, 154.0], [87.7, 155.0], [87.8, 156.0], [87.9, 157.0], [88.0, 158.0], [88.1, 159.0], [88.2, 160.0], [88.3, 161.0], [88.4, 163.0], [88.5, 164.0], [88.6, 165.0], [88.7, 167.0], [88.8, 168.0], [88.9, 169.0], [89.0, 171.0], [89.1, 172.0], [89.2, 174.0], [89.3, 175.0], [89.4, 176.0], [89.5, 177.0], [89.6, 177.0], [89.7, 178.0], [89.8, 179.0], [89.9, 179.0], [90.0, 180.0], [90.1, 180.0], [90.2, 181.0], [90.3, 181.0], [90.4, 182.0], [90.5, 182.0], [90.6, 183.0], [90.7, 184.0], [90.8, 184.0], [90.9, 185.0], [91.0, 187.0], [91.1, 189.0], [91.2, 192.0], [91.3, 196.0], [91.4, 200.0], [91.5, 206.0], [91.6, 214.0], [91.7, 217.0], [91.8, 226.0], [91.9, 242.0], [92.0, 245.0], [92.1, 247.0], [92.2, 249.0], [92.3, 251.0], [92.4, 252.0], [92.5, 253.0], [92.6, 255.0], [92.7, 256.0], [92.8, 257.0], [92.9, 258.0], [93.0, 259.0], [93.1, 260.0], [93.2, 261.0], [93.3, 262.0], [93.4, 263.0], [93.5, 264.0], [93.6, 265.0], [93.7, 266.0], [93.8, 267.0], [93.9, 268.0], [94.0, 268.0], [94.1, 269.0], [94.2, 270.0], [94.3, 271.0], [94.4, 272.0], [94.5, 273.0], [94.6, 274.0], [94.7, 275.0], [94.8, 276.0], [94.9, 278.0], [95.0, 279.0], [95.1, 281.0], [95.2, 283.0], [95.3, 285.0], [95.4, 287.0], [95.5, 289.0], [95.6, 292.0], [95.7, 294.0], [95.8, 297.0], [95.9, 300.0], [96.0, 303.0], [96.1, 307.0], [96.2, 310.0], [96.3, 315.0], [96.4, 319.0], [96.5, 323.0], [96.6, 328.0], [96.7, 333.0], [96.8, 339.0], [96.9, 345.0], [97.0, 351.0], [97.1, 357.0], [97.2, 363.0], [97.3, 370.0], [97.4, 376.0], [97.5, 382.0], [97.6, 387.0], [97.7, 394.0], [97.8, 401.0], [97.9, 408.0], [98.0, 416.0], [98.1, 423.0], [98.2, 431.0], [98.3, 441.0], [98.4, 450.0], [98.5, 460.0], [98.6, 470.0], [98.7, 483.0], [98.8, 494.0], [98.9, 505.0], [99.0, 514.0], [99.1, 529.0], [99.2, 541.0], [99.3, 562.0], [99.4, 593.0], [99.5, 644.0], [99.6, 683.0], [99.7, 737.0], [99.8, 859.0], [99.9, 1047.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 100.0, "maxY": 369792.0, "series": [{"data": [[600.0, 903.0], [700.0, 485.0], [800.0, 263.0], [900.0, 190.0], [1000.0, 202.0], [16500.0, 1.0], [17400.0, 1.0], [16900.0, 1.0], [1100.0, 61.0], [1200.0, 67.0], [19700.0, 1.0], [1300.0, 64.0], [1400.0, 13.0], [1500.0, 23.0], [100.0, 369792.0], [1600.0, 11.0], [1700.0, 10.0], [1800.0, 14.0], [1900.0, 2.0], [32100.0, 1.0], [2100.0, 1.0], [2300.0, 2.0], [2400.0, 4.0], [40500.0, 1.0], [2900.0, 1.0], [200.0, 18187.0], [3500.0, 3.0], [3700.0, 5.0], [3800.0, 5.0], [3900.0, 8.0], [4000.0, 4.0], [4100.0, 1.0], [4400.0, 2.0], [4500.0, 1.0], [4600.0, 1.0], [300.0, 7693.0], [4800.0, 4.0], [5300.0, 1.0], [5600.0, 1.0], [5900.0, 1.0], [400.0, 4301.0], [500.0, 2316.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 40500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 6.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 400015.0, "series": [{"data": [[0.0, 400015.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 4522.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 105.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 6.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 59.98001816530428, "minX": 1.584879E12, "maxY": 100.0, "series": [{"data": [[1.58487924E12, 100.0], [1.58487942E12, 100.0], [1.58487936E12, 100.0], [1.58487906E12, 99.85281901942986], [1.58487954E12, 100.0], [1.584879E12, 59.98001816530428], [1.58487948E12, 100.0], [1.58487918E12, 100.0], [1.58487912E12, 100.0], [1.5848796E12, 99.86773077656412], [1.5848793E12, 100.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5848796E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 114.66666666666667, "minX": 1.0, "maxY": 336.0, "series": [{"data": [[2.0, 319.0], [3.0, 336.0], [4.0, 270.6666666666667], [5.0, 188.0], [6.0, 161.33333333333334], [7.0, 154.75], [8.0, 198.5], [9.0, 143.5], [10.0, 134.375], [11.0, 135.1], [12.0, 133.0], [13.0, 127.89999999999999], [14.0, 127.9090909090909], [15.0, 118.875], [16.0, 136.27272727272728], [17.0, 148.64285714285717], [18.0, 129.64285714285714], [19.0, 154.8888888888889], [20.0, 131.2307692307692], [21.0, 125.5294117647059], [22.0, 130.8], [23.0, 124.00000000000001], [24.0, 132.78947368421055], [25.0, 120.75], [26.0, 152.15000000000003], [27.0, 114.66666666666667], [29.0, 304.08000000000004], [30.0, 165.25], [32.0, 287.29166666666663], [33.0, 132.66666666666666], [34.0, 327.4074074074074], [36.0, 255.88235294117646], [37.0, 121.0], [38.0, 205.6969696969697], [40.0, 205.3714285714286], [41.0, 139.0555555555556], [42.0, 181.83333333333334], [43.0, 182.8717948717949], [45.0, 179.57575757575756], [44.0, 124.0], [47.0, 228.69444444444443], [49.0, 241.4651162790697], [48.0, 120.75], [51.0, 203.08695652173918], [50.0, 125.0], [52.0, 165.95454545454547], [54.0, 199.04255319148936], [55.0, 156.75], [56.0, 195.29411764705884], [57.0, 195.41999999999996], [59.0, 198.42857142857142], [61.0, 184.1730769230769], [62.0, 197.44444444444443], [63.0, 201.5806451612903], [64.0, 130.9272727272727], [65.0, 168.75555555555553], [66.0, 123.39999999999999], [67.0, 168.07500000000002], [68.0, 153.00000000000003], [69.0, 148.44897959183677], [70.0, 131.25], [71.0, 132.40384615384616], [72.0, 126.81632653061224], [73.0, 145.07407407407413], [74.0, 133.1666666666667], [75.0, 145.16666666666666], [76.0, 127.58730158730158], [77.0, 191.10714285714286], [78.0, 127.28571428571428], [79.0, 131.4558823529412], [80.0, 127.3676470588235], [81.0, 124.71186440677967], [82.0, 126.31746031746032], [83.0, 128.51562500000003], [84.0, 125.04999999999998], [85.0, 143.59649122807016], [86.0, 122.40425531914894], [87.0, 178.30357142857147], [88.0, 175.3378378378378], [89.0, 135.40816326530617], [90.0, 139.93750000000003], [91.0, 142.29999999999995], [92.0, 131.7205882352941], [93.0, 127.01515151515153], [94.0, 129.03896103896102], [95.0, 134.91228070175438], [96.0, 137.48387096774192], [97.0, 143.9365079365079], [98.0, 151.7532467532468], [99.0, 138.70312500000006], [100.0, 146.9251419746939], [1.0, 326.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[99.75498210790546, 147.00532067377156]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 4379.1, "minX": 1.584879E12, "maxY": 224594.05, "series": [{"data": [[1.58487924E12, 81949.6], [1.58487942E12, 83234.48333333334], [1.58487936E12, 81871.55], [1.58487906E12, 83318.71666666666], [1.58487954E12, 83746.31666666667], [1.584879E12, 4379.1], [1.58487948E12, 81394.43333333333], [1.58487918E12, 71588.23333333334], [1.58487912E12, 79041.68333333333], [1.5848796E12, 73051.78333333334], [1.5848793E12, 81407.21666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.58487924E12, 219671.13333333333], [1.58487942E12, 223223.38333333333], [1.58487936E12, 219356.45], [1.58487906E12, 223447.38333333333], [1.58487954E12, 224594.05], [1.584879E12, 11744.683333333332], [1.58487948E12, 218183.16666666666], [1.58487918E12, 191882.93333333332], [1.58487912E12, 211980.05], [1.5848796E12, 195808.43333333332], [1.5848793E12, 218321.73333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5848796E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 140.50630566829187, "minX": 1.584879E12, "maxY": 167.33012758151017, "series": [{"data": [[1.58487924E12, 145.5269138320353], [1.58487942E12, 143.34244480550518], [1.58487936E12, 146.3508716477429], [1.58487906E12, 142.99957034420075], [1.58487954E12, 142.77729226531162], [1.584879E12, 162.98728428701182], [1.58487948E12, 146.1370392099328], [1.58487918E12, 167.33012758151017], [1.58487912E12, 150.35396537842172], [1.5848796E12, 140.50630566829187], [1.5848793E12, 146.06654777318954]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5848796E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 139.62732547054298, "minX": 1.584879E12, "maxY": 166.86585874308574, "series": [{"data": [[1.58487924E12, 145.1004200354471], [1.58487942E12, 143.33838287298073], [1.58487936E12, 144.88030343553368], [1.58487906E12, 142.9956557024871], [1.58487954E12, 142.7737300814537], [1.584879E12, 162.96957311534936], [1.58487948E12, 145.7202014275935], [1.58487918E12, 166.86585874308574], [1.58487912E12, 150.3504679951678], [1.5848796E12, 139.62732547054298], [1.5848793E12, 146.06273666723743]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5848796E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 10.932318506732594, "minX": 1.584879E12, "maxY": 17.54401423131438, "series": [{"data": [[1.58487924E12, 11.676936897564747], [1.58487942E12, 11.189071012138104], [1.58487936E12, 13.39327481825466], [1.58487906E12, 11.478326251969332], [1.58487954E12, 10.932318506732594], [1.584879E12, 17.485013623978173], [1.58487948E12, 12.83191551774718], [1.58487918E12, 17.54401423131438], [1.58487912E12, 12.937676127214157], [1.5848796E12, 11.427096668754912], [1.5848793E12, 12.103974788068344]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5848796E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 105.0, "minX": 1.584879E12, "maxY": 5996.0, "series": [{"data": [[1.58487924E12, 1398.0], [1.58487942E12, 1410.0], [1.58487936E12, 4889.0], [1.58487906E12, 5334.0], [1.58487954E12, 3767.0], [1.584879E12, 1364.0], [1.58487948E12, 4642.0], [1.58487918E12, 4543.0], [1.58487912E12, 5996.0], [1.5848796E12, 1279.0], [1.5848793E12, 1888.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.58487924E12, 106.0], [1.58487942E12, 106.0], [1.58487936E12, 105.0], [1.58487906E12, 105.0], [1.58487954E12, 106.0], [1.584879E12, 106.0], [1.58487948E12, 106.0], [1.58487918E12, 106.0], [1.58487912E12, 106.0], [1.5848796E12, 106.0], [1.5848793E12, 106.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.58487924E12, 188.0], [1.58487942E12, 185.0], [1.58487936E12, 184.0], [1.58487906E12, 185.0], [1.58487954E12, 183.90000000000146], [1.584879E12, 249.0], [1.58487948E12, 191.0], [1.58487918E12, 254.0], [1.58487912E12, 235.8000000000029], [1.5848796E12, 145.0], [1.5848793E12, 193.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.58487924E12, 501.0], [1.58487942E12, 516.9900000000016], [1.58487936E12, 524.9900000000016], [1.58487906E12, 506.0], [1.58487954E12, 490.9900000000016], [1.584879E12, 518.8799999999992], [1.58487948E12, 540.0], [1.58487918E12, 730.9900000000016], [1.58487912E12, 704.9900000000016], [1.5848796E12, 390.0], [1.5848793E12, 564.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.58487924E12, 280.0], [1.58487942E12, 285.0], [1.58487936E12, 273.0], [1.58487906E12, 272.0], [1.58487954E12, 274.0], [1.584879E12, 344.8499999999999], [1.58487948E12, 292.0], [1.58487918E12, 356.0], [1.58487912E12, 377.9500000000007], [1.5848796E12, 268.9500000000007], [1.5848793E12, 300.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5848796E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 118.0, "minX": 5.0, "maxY": 40594.0, "series": [{"data": [[5.0, 245.0], [74.0, 120.0], [96.0, 263.0], [147.0, 118.0], [208.0, 179.0], [264.0, 179.0], [315.0, 176.0], [327.0, 266.0], [332.0, 125.0], [335.0, 180.0], [350.0, 221.0], [345.0, 263.0], [352.0, 268.0], [353.0, 261.0], [378.0, 181.0], [374.0, 182.5], [388.0, 214.0], [395.0, 182.0], [399.0, 123.0], [404.0, 122.0], [409.0, 182.0], [410.0, 181.0], [421.0, 181.0], [428.0, 179.0], [424.0, 122.0], [423.0, 179.0], [419.0, 180.0], [429.0, 181.0], [441.0, 180.0], [447.0, 120.0], [440.0, 181.0], [434.0, 238.0], [459.0, 180.0], [458.0, 125.5], [451.0, 181.0], [453.0, 180.0], [452.0, 180.0], [477.0, 132.0], [464.0, 122.0], [476.0, 176.0], [474.0, 181.0], [490.0, 120.0], [481.0, 123.0], [489.0, 126.0], [494.0, 119.0], [491.0, 131.0], [509.0, 130.0], [502.0, 172.0], [506.0, 154.5], [517.0, 125.0], [526.0, 121.0], [529.0, 121.0], [543.0, 123.0], [539.0, 123.0], [514.0, 125.5], [524.0, 122.0], [521.0, 123.0], [531.0, 121.0], [549.0, 122.0], [544.0, 126.0], [551.0, 128.0], [556.0, 139.0], [547.0, 123.0], [568.0, 120.0], [572.0, 122.0], [562.0, 127.0], [548.0, 145.0], [600.0, 125.0], [603.0, 121.0], [585.0, 124.0], [594.0, 122.0], [604.0, 132.0], [586.0, 123.0], [595.0, 122.0], [599.0, 121.0], [588.0, 131.0], [583.0, 131.0], [590.0, 122.0], [601.0, 131.0], [637.0, 125.0], [629.0, 127.0], [632.0, 123.0], [634.0, 124.0], [636.0, 130.0], [619.0, 124.0], [623.0, 125.0], [608.0, 122.0], [630.0, 122.0], [631.0, 122.0], [609.0, 122.0], [613.0, 124.0], [612.0, 125.0], [638.0, 127.0], [639.0, 126.0], [664.0, 124.0], [657.0, 124.0], [641.0, 124.0], [640.0, 128.0], [654.0, 126.0], [655.0, 126.0], [642.0, 121.0], [662.0, 123.0], [663.0, 124.0], [646.0, 124.0], [647.0, 122.0], [645.0, 124.0], [643.0, 132.0], [660.0, 124.0], [659.0, 128.0], [658.0, 123.0], [661.0, 124.0], [671.0, 124.0], [656.0, 121.0], [667.0, 130.0], [666.0, 124.0], [668.0, 123.5], [670.0, 123.0], [653.0, 122.0], [650.0, 123.0], [651.0, 124.0], [652.0, 134.0], [648.0, 122.0], [649.0, 122.0], [699.0, 124.0], [696.0, 123.0], [694.0, 123.0], [695.0, 127.0], [701.0, 124.0], [690.0, 124.0], [689.0, 127.0], [703.0, 123.0], [702.0, 124.0], [700.0, 123.0], [691.0, 122.0], [698.0, 124.0], [697.0, 123.0], [678.0, 124.0], [675.0, 124.0], [676.0, 122.0], [679.0, 123.0], [687.0, 124.0], [686.0, 123.0], [673.0, 125.0], [672.0, 125.0], [674.0, 123.0], [683.0, 122.0], [684.0, 127.0], [681.0, 125.0], [680.0, 126.0], [685.0, 125.0], [693.0, 126.0], [692.0, 124.0], [706.0, 123.0], [722.0, 123.0], [724.0, 123.0], [720.0, 122.0], [721.0, 123.0], [735.0, 124.0], [729.0, 123.0], [711.0, 124.0], [728.0, 123.0], [733.0, 123.0], [731.0, 123.0], [732.0, 124.0], [730.0, 124.0], [708.0, 124.0], [709.0, 126.0], [707.0, 123.0], [710.0, 125.0], [734.0, 123.0], [725.0, 124.0], [727.0, 123.0], [726.0, 123.0], [713.0, 123.0], [712.0, 124.0], [717.0, 123.0], [716.0, 123.0], [715.0, 124.0], [714.0, 125.0], [719.0, 124.0], [704.0, 124.0], [705.0, 123.0], [718.0, 123.0], [723.0, 126.0], [761.0, 123.0], [756.0, 123.0], [755.0, 123.0], [754.0, 123.0], [759.0, 122.0], [758.0, 124.0], [757.0, 122.0], [745.0, 123.0], [744.0, 123.0], [749.0, 123.0], [748.0, 123.0], [747.0, 124.0], [746.0, 123.0], [739.0, 124.0], [740.0, 124.0], [741.0, 123.0], [742.0, 124.0], [743.0, 123.0], [760.0, 123.0], [753.0, 123.0], [762.0, 123.0], [752.0, 122.0], [767.0, 122.0], [738.0, 124.0], [737.0, 124.0], [736.0, 123.0], [751.0, 124.0], [769.0, 122.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[634.0, 16569.0], [687.0, 19719.0], [694.0, 40594.0], [720.0, 32127.0], [739.0, 17417.0], [757.0, 16915.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 769.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 5.0, "maxY": 268.0, "series": [{"data": [[5.0, 245.0], [74.0, 120.0], [96.0, 263.0], [147.0, 118.0], [208.0, 179.0], [264.0, 179.0], [315.0, 176.0], [327.0, 266.0], [332.0, 125.0], [335.0, 180.0], [350.0, 221.0], [345.0, 263.0], [352.0, 268.0], [353.0, 261.0], [378.0, 181.0], [374.0, 182.5], [388.0, 214.0], [395.0, 182.0], [399.0, 123.0], [404.0, 122.0], [409.0, 182.0], [410.0, 181.0], [421.0, 181.0], [428.0, 179.0], [424.0, 122.0], [423.0, 179.0], [419.0, 180.0], [429.0, 181.0], [441.0, 180.0], [447.0, 120.0], [440.0, 181.0], [434.0, 238.0], [459.0, 180.0], [458.0, 125.5], [451.0, 181.0], [453.0, 180.0], [452.0, 180.0], [477.0, 132.0], [464.0, 122.0], [476.0, 176.0], [474.0, 181.0], [490.0, 120.0], [481.0, 123.0], [489.0, 126.0], [494.0, 119.0], [491.0, 131.0], [509.0, 130.0], [502.0, 172.0], [506.0, 154.5], [517.0, 125.0], [526.0, 121.0], [529.0, 121.0], [543.0, 123.0], [539.0, 123.0], [514.0, 125.5], [524.0, 122.0], [521.0, 123.0], [531.0, 121.0], [549.0, 122.0], [544.0, 126.0], [551.0, 128.0], [556.0, 139.0], [547.0, 123.0], [568.0, 120.0], [572.0, 122.0], [562.0, 127.0], [548.0, 145.0], [600.0, 125.0], [603.0, 121.0], [585.0, 124.0], [594.0, 122.0], [604.0, 132.0], [586.0, 123.0], [595.0, 122.0], [599.0, 121.0], [588.0, 131.0], [583.0, 131.0], [590.0, 122.0], [601.0, 131.0], [637.0, 125.0], [629.0, 127.0], [632.0, 123.0], [634.0, 124.0], [636.0, 130.0], [619.0, 124.0], [623.0, 125.0], [608.0, 122.0], [630.0, 122.0], [631.0, 122.0], [609.0, 122.0], [613.0, 124.0], [612.0, 125.0], [638.0, 127.0], [639.0, 126.0], [664.0, 124.0], [657.0, 124.0], [641.0, 124.0], [640.0, 128.0], [654.0, 126.0], [655.0, 126.0], [642.0, 121.0], [662.0, 123.0], [663.0, 124.0], [646.0, 124.0], [647.0, 122.0], [645.0, 124.0], [643.0, 132.0], [660.0, 124.0], [659.0, 128.0], [658.0, 123.0], [661.0, 124.0], [671.0, 124.0], [656.0, 121.0], [667.0, 130.0], [666.0, 124.0], [668.0, 123.0], [670.0, 123.0], [653.0, 122.0], [650.0, 123.0], [651.0, 124.0], [652.0, 134.0], [648.0, 122.0], [649.0, 122.0], [699.0, 124.0], [696.0, 123.0], [694.0, 123.0], [695.0, 127.0], [701.0, 124.0], [690.0, 124.0], [689.0, 126.5], [703.0, 123.0], [702.0, 124.0], [700.0, 123.0], [691.0, 122.0], [698.0, 124.0], [697.0, 123.0], [678.0, 124.0], [675.0, 124.0], [676.0, 122.0], [679.0, 123.0], [687.0, 124.0], [686.0, 123.0], [673.0, 125.0], [672.0, 125.0], [674.0, 123.0], [683.0, 122.0], [684.0, 127.0], [681.0, 125.0], [680.0, 126.0], [685.0, 125.0], [693.0, 126.0], [692.0, 124.0], [706.0, 123.0], [722.0, 123.0], [724.0, 123.0], [720.0, 122.0], [721.0, 123.0], [735.0, 124.0], [729.0, 123.0], [711.0, 124.0], [728.0, 123.0], [733.0, 123.0], [731.0, 123.0], [732.0, 124.0], [730.0, 124.0], [708.0, 124.0], [709.0, 126.0], [707.0, 123.0], [710.0, 125.0], [734.0, 123.0], [725.0, 124.0], [727.0, 123.0], [726.0, 123.0], [713.0, 123.0], [712.0, 123.0], [717.0, 123.0], [716.0, 123.0], [715.0, 123.0], [714.0, 125.0], [719.0, 124.0], [704.0, 124.0], [705.0, 123.0], [718.0, 123.0], [723.0, 126.0], [761.0, 123.0], [756.0, 123.0], [755.0, 123.0], [754.0, 123.0], [759.0, 122.0], [758.0, 124.0], [757.0, 122.0], [745.0, 123.0], [744.0, 123.0], [749.0, 123.0], [748.0, 123.0], [747.0, 124.0], [746.0, 123.0], [739.0, 124.0], [740.0, 124.0], [741.0, 123.0], [742.0, 124.0], [743.0, 123.0], [760.0, 123.0], [753.0, 123.0], [762.0, 123.0], [752.0, 122.0], [767.0, 122.0], [738.0, 124.0], [737.0, 124.0], [736.0, 123.0], [751.0, 124.0], [769.0, 122.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[634.0, 0.0], [687.0, 0.0], [694.0, 0.0], [720.0, 0.0], [739.0, 0.0], [757.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 769.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 38.13333333333333, "minX": 1.584879E12, "maxY": 701.8166666666667, "series": [{"data": [[1.58487924E12, 686.45], [1.58487942E12, 697.5333333333333], [1.58487936E12, 685.4833333333333], [1.58487906E12, 698.4666666666667], [1.58487954E12, 701.8166666666667], [1.584879E12, 38.13333333333333], [1.58487948E12, 681.8], [1.58487918E12, 599.6166666666667], [1.58487912E12, 662.4], [1.5848796E12, 610.2166666666667], [1.5848793E12, 682.2166666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5848796E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.584879E12, "maxY": 701.8166666666667, "series": [{"data": [[1.58487924E12, 686.4333333333333], [1.58487942E12, 697.5333333333333], [1.58487936E12, 685.45], [1.58487906E12, 698.2333333333333], [1.58487954E12, 701.8166666666667], [1.584879E12, 36.7], [1.58487948E12, 681.7833333333333], [1.58487918E12, 599.6], [1.58487912E12, 662.4], [1.5848796E12, 611.8666666666667], [1.5848793E12, 682.2166666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.58487924E12, 0.016666666666666666], [1.58487936E12, 0.03333333333333333], [1.58487948E12, 0.016666666666666666], [1.58487918E12, 0.016666666666666666], [1.5848796E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: java.net.NoRouteToHostException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.5848796E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.584879E12, "maxY": 701.8166666666667, "series": [{"data": [[1.58487924E12, 686.4333333333333], [1.58487942E12, 697.5333333333333], [1.58487936E12, 685.45], [1.58487906E12, 698.2333333333333], [1.58487954E12, 701.8166666666667], [1.584879E12, 36.7], [1.58487948E12, 681.7833333333333], [1.58487918E12, 599.6], [1.58487912E12, 662.4], [1.5848796E12, 611.8666666666667], [1.5848793E12, 682.2166666666667]], "isOverall": false, "label": "HTTP Request-success", "isController": false}, {"data": [[1.58487924E12, 0.016666666666666666], [1.58487936E12, 0.03333333333333333], [1.58487948E12, 0.016666666666666666], [1.58487918E12, 0.016666666666666666], [1.5848796E12, 0.016666666666666666]], "isOverall": false, "label": "HTTP Request-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5848796E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.584879E12, "maxY": 701.8166666666667, "series": [{"data": [[1.58487924E12, 686.4333333333333], [1.58487942E12, 697.5333333333333], [1.58487936E12, 685.45], [1.58487906E12, 698.2333333333333], [1.58487954E12, 701.8166666666667], [1.584879E12, 36.7], [1.58487948E12, 681.7833333333333], [1.58487918E12, 599.6], [1.58487912E12, 662.4], [1.5848796E12, 611.8666666666667], [1.5848793E12, 682.2166666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.58487924E12, 0.016666666666666666], [1.58487936E12, 0.03333333333333333], [1.58487948E12, 0.016666666666666666], [1.58487918E12, 0.016666666666666666], [1.5848796E12, 0.016666666666666666]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.5848796E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

