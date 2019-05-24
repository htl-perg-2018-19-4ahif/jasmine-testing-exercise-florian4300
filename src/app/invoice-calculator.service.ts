import { Injectable } from "@angular/core";
import { VatCategory, VatCategoriesService } from "./vat-categories.service";

export interface InvoiceLine {
  product: string;
  vatCategory: VatCategory;
  priceInclusiveVat: number;
}

export interface InvoiceLineComplete extends InvoiceLine {
  priceExclusiveVat: number;
}

export interface Invoice {
  invoiceLines: InvoiceLineComplete[];
  totalPriceInclusiveVat: number;
  totalPriceExclusiveVat: number;
  totalVat: number;
}

@Injectable({
  providedIn: "root"
})
export class InvoiceCalculatorService {
  constructor(private vatCategoriesService: VatCategoriesService) {}

  public CalculatePriceExclusiveVat(
    priceInclusiveVat: number,
    vatPercentage: number
  ): number {
    // REPLACE the next line with the necessary code

    return (
      priceInclusiveVat -
      (priceInclusiveVat / (100 + vatPercentage)) * vatPercentage
    );
  }

  public CalculateInvoice(invoiceLines: InvoiceLine[]): Invoice {
    // REPLACE the next line with the necessary code
    let sumpriceexclusiveVat = 0;
    let sumpriceinclVat = 0;
    let sumVat = 0;
    let invoiceArr: InvoiceLineComplete[] = [];
    for (const inv of invoiceLines) {
      let vat = this.vatCategoriesService.getVat(inv.vatCategory);
      sumVat += (inv.priceInclusiveVat / (100 + vat)) * 20;
      let priceExclusiveVat = (inv.priceInclusiveVat / (100 + vat)) * 100;
      sumpriceexclusiveVat += (inv.priceInclusiveVat / (100 + vat)) * 100;
      sumpriceinclVat += inv.priceInclusiveVat;
      invoiceArr.push({
        product: inv.product,
        vatCategory: inv.vatCategory,
        priceExclusiveVat: priceExclusiveVat,
        priceInclusiveVat: inv.priceInclusiveVat
      });
    }
    const invoice: Invoice = {
      totalPriceExclusiveVat: sumpriceexclusiveVat,
      totalPriceInclusiveVat: sumpriceinclVat,
      totalVat: sumVat,
      invoiceLines: invoiceArr
    };
    return invoice;
  }
}
