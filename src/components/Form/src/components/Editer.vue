<template>
  <Tinymce v-bind="attrs" :options="options" v-model="state" @change="change" width="100%" />
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { useAttrs } from '/@/hooks/core/useAttrs';

  export default defineComponent({
    name: 'Editer',
    components: {
      Tinymce,
    },
    props: {
      value: [String],
    },
    setup(props) {
      const options = {
        toolbar:
          'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
                     styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
                     table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs importword kityformula-editor',
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
      };
      const attrs = useAttrs();
      const emitData = ref<any[]>([]);
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);

      function change(val) {
        emitData.value = val;
      }

      return { options, state, attrs, change };
    },
  });
</script>
