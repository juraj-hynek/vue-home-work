<!-- <props-demo-comp 
stringProp="juraj" 
:numberProp="1" 
:booleanProp="true" 
:arrayProp="[1,2,3,4,5,6]"
:objectProp="{name: 'juraj'}"
:testPropsFunctionForDemo="testPropsFunctionForDemo"
/> -->
<!-- <div>
                <props-demo-comp 
                stringProp="juraj" 
                :numberProp="1" 
                :booleanProp="true" 
                :arrayProp="[1,2,3,4,5,6]"
                :objectProp="{name: 'juraj'}"
                :testPropsFunctionForDemo="testPropsFunctionForDemo"
                @testPropsFunctionForDemoEmit="testPropsFunctionForDemoEmit"
                />
            </div> -->
<template>
    <section class="ion-padding">
        <div>
            <div v-if="true">ahoj</div>
            <div v-if="true">ahoj2</div>
            <div v-if="true">ahoj3</div>
            <div v-if="true">ahoj4</div>
            <div v-else>hello</div>
        </div>
        <div>
            <p>String Prop: {{ stringProp }}</p>
            <p>Number Prop: {{ typeof numberProp === 'number' }} {{ numberProp + numberProp }}</p>
            <p>Boolean Prop: {{ booleanProp }}</p>
            <p>Array Prop: {{ arrayProp }}</p>
            <p>Object Prop: {{ JSON.stringify(objectProp, null, 2) }}</p>
            <ion-button @click="testPropsFunctionForDemo('kitty so cute')">click</ion-button>
            <ion-button @click="testPropsFunctionForDemoEmit">Emit it</ion-button>
        </div>
        <div>
            <ion-button @click="increment">{{ couter }}</ion-button>
        </div>
        <div>
            <label>
                String
                <input name="" :value="inputValue" type="text" @change="onInputChangeHand" />
            </label>
            <label>
                Number
                <input name="" :value="inputValue" type="number" @change="onInputChangeHand" />
            </label>
            <label>
                Range
                <input name="" :value="inputValue" type="range" @change="onInputChangeHand" />
            </label>
            <label>
                Date
                <input name="" :value="inputValue" type="date" @change="onInputChangeHand" />
            </label>
            <label>
                Time
                <input name="" :value="inputValue" type="time" @change="onInputChangeHand" />
            </label>
            <label>
                Radio
                <input name="" :value="inputValue" type="radio" @change="onInputChangeHand" />
            </label>
            <label>
                Checkbox
                <input name="" :value="inputValue" type="checkbox" @change="onInputChangeHand" />
            </label>
        </div>
    </section>
</template>
<script>
import { defineComponent, ref, watch, onMounted } from 'vue';
import { IonButton } from '@ionic/vue';


export default defineComponent({
    name: 'PropsDemoComp',
    props: {
        stringProp: String,
        numberProp: Number,
        booleanProp: Boolean,
        arrayProp: Array,
        objectProp: Object,
        testPropsFunctionForDemo: Function
    },
    setup(props, { emit }) {

        const inputValue = ref(undefined)

        const couter = ref(0);
        const increment = () => {
            couter.value += 1
        };

        const onInputChangeHand = ({ target }) => {
            const { value, checked } = target;
            inputValue.value = value;
            console.log(value, checked)
        }

        // onMounted(() => {
        //     // not working with ()=> ....
        //     watch(inputValue, () => {
        //         console.log('changs')
        //     });
        // });

        // not working with ()=> ....
        watch(inputValue, (prev, next) => {
            console.log('changs', prev, next)
        });

        const testPropsFunctionForDemoEmit = () => {
            emit('testPropsFunctionForDemoEmit', 'Hello I am emit demo')
        };
        return {
            couter,
            IonButton,
            increment,
            onInputChangeHand,
            inputValue,
            testPropsFunctionForDemoEmit
        }
    }
})
</script>
<style scoped>
input {
    display: block;
}
</style>