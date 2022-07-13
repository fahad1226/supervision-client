<template>
    <div>
        <Alert
            :open="alert.open"
            :status="alert.status"
            :message="alert.message"
            :color="alert.color"
        />
        <div
            class="bg-white rounded w-full lg:px-10 sm:px-6 sm:py-10 px-2 py-6"
        >
            <p
                tabindex="0"
                class="focus:outline-none font-mono border border-indigo-500 bg-blue-50 rounded-lg text-center py-3 text-indigo-600 text-2xl font-extrabold leading-6"
            >
                Submit your new project idea
            </p>

            <br />

            <hr />

            <br />
            <div class="mb-4">
                <label
                    for="email"
                    class="text-sm font-medium leading-none text-gray-800"
                    >Project Title</label
                >
                <input
                    id="last_name"
                    type="text"
                    v-model="idea.name"
                    :class="
                        v$.idea.name.$error
                            ? 'border border-red-300 rounded text-xs font-medium leading-none placeholder-gray-400 text-gray-800 py-3 w-full pl-3 mt-2'
                            : 'border rounded text-xs font-medium leading-none placeholder-gray-400 text-gray-800 py-3 w-full pl-3 mt-2'
                    "
                    placeholder="project title"
                />

                <div v-for="error of v$.$errors" :key="error.$uid">
                    <div
                        v-if="
                            error.$validator === 'required' &&
                            error.$property === 'name'
                        "
                        class="text-red-700 ml-1 appearance-none"
                    >
                        <span class="block sm:inline font-thin"
                            >Project title cannot be empty.</span
                        >
                    </div>
                </div>
            </div>

            <editor
                id="details"
                api-key="kugqzag6sf0jxnetl94v542ompov15bixo47unpcy0jafwr3"
                :init="init"
                :plugins="plugins"
                :toolbar="toolbar"
                v-model="idea.details"
                placeholder="Describe the
                        assignment to the students."
            />

            <div v-for="error of v$.$errors" :key="error.$uid">
                <div
                    v-if="
                        error.$validator === 'required' &&
                        error.$property === 'details'
                    "
                    class="text-red-700 ml-1 appearance-none"
                >
                    <span class="block sm:inline font-thin"
                        >Project details cannot be empty.</span
                    >
                </div>
                <div
                    v-if="
                        error.$validator === 'minLengthValue' &&
                        error.$property === 'details'
                    "
                    class="text-red-700 ml-1 appearance-none"
                >
                    <span class="block sm:inline font-thin"
                        >Project details should more than 100 characters.</span
                    >
                </div>
            </div>

            <div class="mt-2">
                <label
                    for="tags"
                    class="text-sm font-medium leading-none text-gray-800"
                    >Tags</label
                >

                <Multiselect
                    mode="multiple"
                    :searchable="true"
                    :multipleLabel="showName"
                    v-model="idea.tag"
                    placeholder="Ml, AI, Software Engineering..."
                    :options="tags"
                />
                <div v-for="error of v$.$errors" :key="error.$uid">
                    <div
                        v-if="
                            error.$validator === 'required' &&
                            error.$property === 'tag'
                        "
                        class="text-red-700 ml-1 appearance-none"
                    >
                        <span class="block sm:inline font-thin"
                            >Project tags cannot be empty.</span
                        >
                    </div>
                </div>
            </div>

            <div class="mt-8" @click.prevent="submitIdea">
                <button
                    role="button"
                    class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import studentService from "@/config/services/studentService";
import Alert from "@/views/shared/Alert.vue";
import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import Editor from "@tinymce/tinymce-vue";
import Multiselect from "@vueform/multiselect";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
export default {
    name: "NewIdea",
    components: {
        Listbox,
        ListboxLabel,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        CheckIcon,
        SelectorIcon,
        Editor,
        Multiselect,
        Alert,
    },
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            tags: [],
            options: [
                { value: "batman", label: "Batman" },
                { value: "robin", label: "Robin", disabled: true },
                { value: "joker", label: "Joker" },
            ],
            value: null,
            idea: {
                name: "",
                details: "",
                tag: [],
            },
            alert: {
                open: false,
                status: "",
                message: "",
                color: "",
            },
            toolbar:
                "undo redo | bold italic underline strikethrough | image media fileupload | alignleft aligncenter alignright alignjustify |  numlist bullist | fontselect fontsizeselect formatselect paste pastetext | outdent indent | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | link anchor codesample | ltr rtl | code",
            plugins:
                "print preview paste  importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap emoticons code",
            init: {
                height: 350,
                skin: "",
                content_css: "",
                toolbar_mode: "sliding",
                image_caption: true,
                browser_spellcheck: true,
                relative_urls: false,
                remove_script_host: false,
                convert_urls: true,
                image_advtab: true,
                menubar: true,
                branding: false,
                block_unsupported_drop: false,
                paste_data_images: false,
                automatic_uploads: true,
                images_upload_credentials: true,
            },
        };
    },
    validations() {
        return {
            idea: {
                name: {
                    required,
                    $autoDirty: true,
                    $lazy: true,
                },
                details: {
                    required,
                    minLengthValue: minLength(100),
                    $autoDirty: true,
                    $lazy: true,
                },
                tag: {
                    required,
                    $autoDirty: true,
                    $lazy: true,
                },
            },
        };
    },
    mounted() {
        this.getTags();
    },
    methods: {
        selectedName(name) {
            return name.name;
        },
        async submitIdea() {
            try {
                const isFormCorrect = await this.v$.$validate();
                if (!isFormCorrect) return;
                const response = await studentService.postIdea(this.idea);

                if (response.status === 200) {
                    this.alert.open = true;
                    this.alert.message =
                        "Project proposal submitted successfully!";
                    this.alert.status = "success";
                    this.alert.color = "green";
                }

                setTimeout(() => {
                    this.alert.open = false;
                    this.$router.push("/students/section/submitted-ideas");
                }, 2000);
            } catch (error) {
                this.alert.open = true;
                this.alert.message = error.response.data.message;
                this.alert.status = "unsuccess";
                this.alert.color = "red";
                setTimeout(() => {
                    this.alert.open = false;
                }, 3000);
            }
        },
        async getTags() {
            const response = await studentService.getTags();
            response.data.tags.forEach((tag, index) => {
                this.tags.push({
                    value: tag.id,
                    label: tag.name,
                });
            });
            // this.tags = response.data.tags;
            // console.log("tag is", response.data);
        },
        showName(value) {
            console.log("helloi values", value);
            let names = [];
            value.forEach((element) => {
                names.push(element.label);
            });
            return names.join(", ").toString();
        },
    },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
