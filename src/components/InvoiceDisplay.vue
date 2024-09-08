<template>
    <div class="d-flex align-items-center justify-content-center min-vh-100 bg-secondary">
        <div class="card shadow-lg">
            <div id="invoice-content" class="card-body">
                <div class="text-center mb-3">
                    <h4 class="fw-semibold">Quirkweb Studios</h4>
                    <p class="small">Nairobi, Kenya</p>
                </div>
                <div class="border-bottom pb-3 mb-3">
                    <h2 class="h6">Invoice</h2>
                    <p class="small"><strong>Invoice Number:</strong> {{ generateInvoiceNumber }}</p>
                    <p class="small"><strong>Client Name:</strong> {{ invoice.clientName }}</p>
                    <p class="small"><strong>Client Email:</strong> {{ invoice.clientEmail }}</p>
                    <p class="small"><strong>Invoice Date:</strong> {{ invoice.invoiceDate }}</p>
                </div>
                <div class="invoice-display">
                    <table class="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in invoice.items" :key="item.description">
                                <td>{{ item.description }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ formatCurrency(item.price) }}</td>
                                <td>{{ formatCurrency(item.quantity * item.price) }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="small"><strong>Total Amount:</strong> {{ formatCurrency(totalAmount) }}</p>
                    <p class="small"><strong>Paid Amount:</strong> {{ formatCurrency(invoice.paidAmount) }}</p>
                    <p class="small"><strong>Pending Amount:</strong> {{ formatCurrency(pendingAmount) }}</p>
                    <p class="small"><strong>Status:</strong> {{ invoiceStatus }}</p>
                </div>
                <hr class="border-top border-2 border-dark my-3">
                <div class="text-center">
                    <p class="small mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-envelope me-2" viewBox="0 0 16 16">
                            <path
                                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                        </svg>
                        info@quirkwebstudios.co.ke
                    </p>
                    <p class="small">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-telephone me-2" viewBox="0 0 16 16">
                            <path
                                d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                        </svg>
                        +254739456722
                    </p>
                </div>
            </div>
            <div class="card-footer">
                <button @click="downloadPDF" class="btn btn-primary btn-sm w-100">Download PDF</button>
            </div>
        </div>
    </div>
</template>

<script>
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default {
    props: ['invoice'],
    computed: {
        totalAmount() {
            return this.invoice.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        },
        pendingAmount() {
            return this.totalAmount - this.invoice.paidAmount;
        },
        invoiceStatus() {
            return this.pendingAmount > 0 ? 'Pending' : 'Paid in Full';
        },
        generateInvoiceNumber() {
            const date = new Date(this.invoice.invoiceDate);
            const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
                .toString()
                .padStart(2, '0')}${date
                    .getDate()
                    .toString()
                    .padStart(2, '0')}`;
            const randomDigits = Math.floor(Math.random() * 9000) + 1000;
            return `INV-${formattedDate}-${randomDigits}`;
        }
    },
    methods: {
        formatCurrency(value) {
            const numericValue = parseFloat(value);
            return isNaN(numericValue) ? '-' : numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
        },
        downloadPDF() {
            const invoiceContent = document.getElementById('invoice-content');
            html2canvas(invoiceContent).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save(`invoice-${this.generateInvoiceNumber}.pdf`);
            });
        }
    }
};
</script>

<style scoped>
.card {
    max-width: 700px;
}
</style>