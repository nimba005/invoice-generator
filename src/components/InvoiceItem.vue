<template>
    <div>
        <input type="text" v-model="itemCopy.description" @input="updateItem" placeholder="Description">
        <input type="number" v-model.number="itemCopy.quantity" @input="updateItem" placeholder="Quantity" min="1">
        <input type="number" v-model.number="itemCopy.price" @input="updateItem" placeholder="Price" min="0"
            step="0.01">
        <button type="button" @click="$emit('remove')">Remove</button>
    </div>
</template>

<script>
import { reactive, watch } from 'vue';

export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    emits: ['update:item', 'remove'],
    setup(props, { emit }) {
        const itemCopy = reactive({ ...props.item });

        watch(() => props.item, (newVal) => {
            Object.assign(itemCopy, newVal);
        }, { deep: true });

        const updateItem = () => {
            emit('update:item', { ...itemCopy });
        };

        return {
            itemCopy,
            updateItem
        };
    }
};
</script>

<style scoped>
div {
    margin-bottom: 10px;
}

input {
    margin-right: 10px;
}
</style>