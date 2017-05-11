import { Component} from '@angular/core';
import { Directive, ElementRef, Input , OnDestroy, OnInit, OnChanges} from '@angular/core';
 
declare var Chart:any;

@Component({
  selector: 'line-chart',
  template: `<canvas width="400" height="250"></canvas>`
})
 
/**
* Chart component
*/
export class ChartComponent implements  OnChanges, OnInit, OnDestroy{
    // les heures en abscisse du graphique
  @Input() labels: string[];
  
  // les températures en ordonnées
  @Input() data: number[];
 
  private el:ElementRef;
  private canvas:any;
  private chart:any;
 
  public constructor(el: ElementRef){
    this.el = el;
  }
 
  public ngOnInit(){
    this.canvas = this.el.nativeElement.children[0];
  }
 
  public ngOnChanges(){
    if(this.data && this.labels){
      this._createGraph();
    }
  }
 
  public ngOnDestroy(){
    if(this.chart){
      this.chart.destroy();
      this.chart=null;
    }
  }

   private _createGraph(){
    let line = this._constructLineChart(this.data);
    line.data.datasets[0].data = this.data;
    line.data.labels = this.labels;
 
    this.chart = new Chart(this.canvas, line)
  }

  private _constructLineChart(datas:number[]){
    return {
      type: 'line',
      data: {
          labels: [],
          datasets: [{
              label: 'temp.',
              data:  [],
              borderColor: "rgba(75,192,192,1)",
              backgroundColor:'#e3f2fd',
              borderWidth:1
          }]
      },
      options:{
        scales:{
          yAxes:[{
            ticks:{
              max:Math.max.apply(Math, datas)+1,
              min:Math.min.apply(Math, datas)-1
            },
            gridLines: {
                display:true
            }
          }],
          xAxes:[{
            gridLines: {
                display:false
            }
          }]
        }
      }
    };
  }

}