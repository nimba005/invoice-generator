<template>
    <div>
        <h1>Invoice Generator</h1>
        <InvoiceForm @generate="generateInvoice" />
        <InvoiceDisplay v-if="invoiceGenerated" :invoice="invoice" />
    </div>
</template>

<script>
import InvoiceForm from './InvoiceForm.vue';
import InvoiceDisplay from './InvoiceDisplay.vue';

export default {
    components: {
        InvoiceForm,
        InvoiceDisplay
    },
    data() {
        return {
            invoiceGenerated: false,
            invoice: {}
        };
    },
    methods: {
        generateInvoice(invoice) {
            this.invoice = invoice;
            this.invoiceGenerated = true;
        }
    }
};
</script>

<style>
/* Add some basic styling */
h1 {
    margin-bottom: 20px;
}
</style>