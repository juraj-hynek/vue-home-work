<template>
    <ion-list>
        <!-- {{ formState }} -->
        <ion-item v-for="(input, index) in inputs" :key="index">
            <template v-if="input.type === 'file'">
                <div>
                    <ion-input :name="input.label" @ionChange="inputChange" accept="item.accept" type="file"
                        :label="input.label" :placeholder="input.placeholder"
                        :label-placement="input.labelPlacement"></ion-input>
                </div>
            </template>
            <template v-if="input.type === 'input'">
                <div>
                    <ion-input :name="input.label" @ionChange="inputChange" :label="input.label"
                        :placeholder="input.placeholder" :label-placement="input.labelPlacement"></ion-input>
                </div>
            </template>
            <template v-if="input.type === 'date'">
                <div>
                    <ion-input :name="input.label" @ionChange="inputChange" type="date" :label="input.label"
                        :placeholder="input.placeholder" :label-placement="input.labelPlacement"></ion-input>
                </div>
            </template>
            <template v-if="input.type === 'time'">
                <div>
                    <ion-input :name="input.label" @ionChange="inputChange" type="time" :label="input.label"
                        :placeholder="input.placeholder" :label-placement="input.labelPlacement"></ion-input>
                </div>
            </template>
            <template v-else-if="input.type === 'select'">
                <div>
                    <ion-select :name="input.label" @ionChange="inputChange" :label="input.label"
                        :placeholder="input.placeholder">
                        <ion-select-option v-for="(option, optionIndex) in input.options" :key="optionIndex"
                            :value="option.value">{{ option.label }}</ion-select-option>
                    </ion-select>
                </div>
            </template>
            <template v-else-if="input.type === 'toggle'">
                <div>
                    <ion-toggle @ionChange="inputChange" :name="input.label">{{ input.label }}</ion-toggle>
                </div>
            </template>
            <template v-else-if="input.type === 'checkbox'">
                <div>
                    <ion-checkbox @ionChange="inputChange" :name="input.label">{{ input.label }}</ion-checkbox>
                </div>
            </template>
            <template v-else-if="input.type === 'range'">
                <div>
                    <ion-range @ionChange="inputChange" :name="input.label" :label-placement="input.labelPlacement">
                        <div slot="label">{{ input.label }}</div>
                    </ion-range>
                </div>
            </template>
            <template v-else-if="input.type === 'segment'">
                <ion-segment :scrollable="input.scrollable" @ionChange="inputChange" :name="input.label"
                    disabled="false" :value="formState[input.label]">
                    <ion-segment-button v-for="(option, index) in input.children" v-bind:key="index" :value="option">
                        <ion-label>{{ option }}</ion-label>
                    </ion-segment-button>
                </ion-segment>
            </template>
            <template v-else-if="input.type === 'list-card'">
                <div>
                    <ion-card class="no-padding no-margin">
                    <ion-card-header  class="no-padding no-margin">
                        <ion-card-title>Card Title</ion-card-title>
                        <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content  class="no-padding no-margin">
                        <ion-list class="no-padding no-margin">
                            <ion-item>
                                <ion-thumbnail slot="start">
                                    <img alt="Silhouette of mountains"
                                        src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                                </ion-thumbnail>
                                <ion-label>Item</ion-label>
                            </ion-item>

                            <ion-item>
                                <ion-thumbnail slot="start">
                                    <img alt="Silhouette of mountains"
                                        src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                                </ion-thumbnail>
                                <ion-label>Item</ion-label>
                            </ion-item>

                            <ion-item>
                                <ion-thumbnail slot="start">
                                    <img alt="Silhouette of mountains"
                                        src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                                </ion-thumbnail>
                                <ion-label>Item</ion-label>
                            </ion-item>

                            <ion-item lines="none">
                                <ion-thumbnail slot="start">
                                    <img alt="Silhouette of mountains"
                                        src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                                </ion-thumbnail>
                                <ion-label>Item</ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-card-content>
                </ion-card>
                </div>
            </template>
        </ion-item>
    </ion-list>
</template>
<script>
import { IonCard, IonThumbnail, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonRange, IonCheckbox, IonSelect, IonSelectOption, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: "DynamicFormRenderer",
    props: {
        inputs: Array,
        formState: Object,
        inputChange: Function
    },
    components: {IonCard, IonThumbnail, IonCardHeader,  IonCardTitle, IonCardSubtitle, IonList, IonItem, IonRange, IonCheckbox, IonSelect, IonSelectOption, IonSegment, IonSegmentButton, IonLabel },
    setup(props) {
        const formState = ref(props.formState || {});
        const inputChange = ({ target }) => {
            formState.value[target.name] = target.value || target.checked
            console.log('inputChange', target.name, target.value)
            props.inputChange(formState)
        }
        watch(formState.value, () => {
            console.log('formState', formState.value);
        });
        return { inputChange }
    }
});
</script>
<style scoped>
div {
    display: flex;
    flex-direction: column;
    flex: 1
}

.no-padding {
    padding: 0;
    width: 100%;
}
.no-margin {
    margin: 0;
    width: 100%;
}
</style>