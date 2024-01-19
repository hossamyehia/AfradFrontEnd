import { ElementRef, Injectable } from '@angular/core';
import domToImage from 'dom-to-image';
import jsPDF from 'jspdf';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  pdf!: any;
  orientation: "p" | "l" | "landscape" | "portrait" | undefined = "p";
  imageUnit: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc" | undefined = "pt";
  quality: number | undefined = 400;

  dimensions = {
    width: 595,
    height: 842
  }
  paddings = {
    top: 20,
    right: 0,
    bottom: 0,
    left: 10,
  }

  jsPdfOptions = {
    orientation: this.orientation,
    unit: this.imageUnit,
    format: 'a4',
  };
  //popupWin!: any;

  constructor() {
  }

  downloadAsPdf(dataToExport: any, pdfName?: string): void {
    const width = dataToExport.clientWidth;
    const height = dataToExport.clientHeight + 50;
    if (width > height) {
      this.orientation = "l";
    } else {
      this.orientation = "p";
    }

    domToImage
      .toPng(dataToExport, {
        width: width,
        height: height + 5,
        quality: this.quality,
      })
      .then((result) => {
        this.pdf = new jsPDF(this.jsPdfOptions);

        this.pdf.addImage(result, 'PNG', this.paddings["left"], 0, this.dimensions["width"] - (this.paddings["left"] * 2), this.dimensions["height"] - 300);
        this.pdf.save(pdfName + '.pdf');

      })
      .catch((error) => {
        console.log(error)
      });
  }

    /*
  savePDF(content: any, name?: string) {

    this.doc.html(
      `<html>
        <head>
          <title>
            بيانات ضابط الصف
          </title>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>`, {
        callback: function (doc:any) {
          name = name || Math.random().toString(36).slice(-8);
          doc.save(`${name}.pdf`);
        },
        x: 10,
        y: 10
     }
    );

    //this.doc.save();

    this.popupWin = window.open(
      'بيانات ضابط صف',
      '_blank',
      'top=0,left=0,height=100%,width=auto'
    );
    if (this.popupWin) {
      this.popupWin.document.open();
      this.popupWin.document.write(`
        <head>
          <title>بيانات ضابط صف</title>
          <link rel="stylesheet" href="styles.css">
        </head>
        <body onload="window.print();window.close()">
          ${content.innerHTML}
        </body>
      `);
      this.popupWin.document.close();
    }

  }
  */

}
