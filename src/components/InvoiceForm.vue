<template>
    <form @submit.prevent="submitInvoice">
        <div>
            <label for="clientName">Client Name:</label>
            <input type="text" v-model="invoice.clientName" id="clientName" required>
        </div>
        <div>
            <label for="clientEmail">Client Email:</label>
            <input type="email" v-model="invoice.clientEmail" id="clientEmail" required>
        </div>
        <div>
            <label for="invoiceDate">Invoice Date:</label>
            <input type="date" v-model="invoice.invoiceDate" id="invoiceDate" required>
        </div>
        <div>
            <label>Items:</label>
            <InvoiceItem v-for="(item, index) in invoice.items" :key="index" :item="item"
                @update:item="updateItem(index, $event)" @remove="removeItem(index)" />
            <button type="button" @click="addItem">Add Item</button>
        </div>
        <div>
            <label for="paidAmount">Paid Amount:</label>
            <input type="number" v-model.number="invoice.paidAmount" id="paidAmount" required min="0" step="0.01">
        </div>
        <button type="submit">Generate Invoice</button>
    </form>
</template>

<script>
import { reactive } from 'vue';
import InvoiceItem from './InvoiceItem.vue';

export default {
    components: {
        InvoiceItem
    },
    emits: ['generate'],
    setup(props, { emit }) {
        const invoice = reactive({
            clientName: '',
            clientEmail: '',
            invoiceDate: '',
            items: [
                { description: '', quantity: 1, price: 0 }
            ],
            paidAmount: 0
        });

        const addItem = () => {
            invoice.items.push({ description: '', quantity: 1, price: 0 });
        };

        const removeItem = (index) => {
            invoice.items.splice(index, 1);
        };

        const updateItem = (index, updatedItem) => {
            invoice.items[index] = updatedItem;
        };

        const submitInvoice = () => {
            emit('generate', invoice);
        };

        return {
            invoice,
            addItem,
            removeItem,
            updateItem,
            submitInvoice
        };
    }
};
</script>

<style scoped>
form div {
    margin-bottom: 10px;
}
</style>