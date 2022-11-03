import { useRef } from 'react';
import ReactDOM from 'react-dom/client'
import Home from './Home'
import { saveAs } from 'file-saver';

export function ExportButton(){
    return(
        <button
        type="button"
        onClick={() => {
          exportChart(chartRef);
        }}
      >
        Export
      </button>
    )
}

function exportChart(chartRef){
    console.log(chartRef.current)
    let chartSVG = chartRef.current;
    let svgURL = new XMLSerializer().serializeToString(chartSVG);
    let svgBlob = new Blob([svgURL], {type: "image/svg+xml;charset=utf-8"});
    saveAs(svgBlob, "chart.svg");
}
