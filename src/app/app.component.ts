import { Component } from "@angular/core";
import {
  InvoiceLine,
  InvoiceCalculatorService,
  Invoice
} from "./invoice-calculator.service";
import { VatCategory } from "./vat-categories.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  invoiceLines: InvoiceLine[] = [];
  invoice: Invoice;
  valid = true;

  product = "";
  priceInclusiveVat = 0.0;
  vatCategoryString = "Food";

  vatCategories = VatCategory;

  constructor(private invoiceCalculator: InvoiceCalculatorService) {}
  mounted() {
    this.invoice = this.invoiceCalculator.CalculateInvoice(this.invoiceLines);
  }

  addInvoice() {
    this.invoiceLines.push({
      priceInclusiveVat: parseFloat(
        (Math.round(this.priceInclusiveVat * 100) / 100).toFixed(2)
      ),
      product: this.product,
      vatCategory: this.vatCategories[this.vatCategoryString]
    });
    this.invoice = this.invoiceCalculator.CalculateInvoice(this.invoiceLines);
  }
  checkValidPrice() {
    if (this.priceInclusiveVat <= 0) {
      this.valid = false;
    }else{
      this.valid = true;
    }
  }
}
