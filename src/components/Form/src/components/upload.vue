<template>
  <div class="upload-wrap">
    <p class="tips" v-if="name == 'image'">{{ imgSizeTips }}</p>
    <Upload
      :name="name"
      v-model:file-list="list"
      list-type="picture-card"
      class="avatar-uploader"
      :action="action"
      :headers="headers"
      :before-upload="beforeUpload"
      @change="handleChange"
      @preview="handlePreview"
      :remove="handleRemove"
      :accept="accept"
      :disabled="disabled"
      :multiple="multiple"
    >
      <!-- 上传按钮 -->
      <div v-if="list.length < limit">
        <plus-outlined />
        <div class="ant-upload-text">Upload</div>
      </div>
    </Upload>
    <!-- 文件链接地址回显 -->
    <div v-if="list.length && (name === 'video' || name === 'file')">
      <ul>
        <li v-for="(item, index) in list" :key="index">{{ item.url }}</li>
      </ul>
    </div>
    <!-- 预览模态框 -->
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" v-if="name == 'image'" />
      <video style="width: 100%" :src="previewImage" controls v-else-if="name == 'video'"></video>
      <audio style="width: 100%" :src="previewImage" controls v-else-if="name == 'audio'"></audio>
      <iframe
        ref="mainiframe"
        :src="previewImage"
        style="height: 100vh; width: 50vw; margin-left: -200px; margin-top: -100px"
        v-else-if="name == 'file'"
      ></iframe>
    </a-modal>
    <div
      style="margin-left: -60px"
      v-if="name == 'image' && !multiple && list.length && list[0].response"
      ><span style="padding-right: 5px">图片地址</span>{{ list[0].response.data }}</div
    >
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useUserStoreWithOut } from '/@/store/modules/user';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { Upload, message, Modal } from 'ant-design-vue';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    url?: string;
    type?: string;
    size: number;
    originFileObj: any;
  }

  interface FileInfo {
    file: FileItem;
    fileList: FileItem[];
  }

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  export default defineComponent({
    name: 'FastUpload',
    components: {
      Upload,
      PlusOutlined,
      LoadingOutlined,
      [Modal.name]: Modal,
      message,
    },
    props: {
      value: [String, Array],
      action: [String],
      name: {
        type: String,
        default: 'image',
      },
      accept: {
        type: String,
        default: '.jpg,.png',
      },
      limit: {
        type: Number,
        default: 1,
      },
      fileSize: {
        type: Number,
        default: 200,
      },
      imgSizeTips: {
        type: String,
        default: '',
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const attrs = useAttrs();
      const userStore = useUserStoreWithOut();
      const token = userStore.getToken;
      const previewVisible = ref<boolean>(false);
      const previewImage = ref<string | undefined>('');
      const baseApi = process.env.NODE_ENV === 'production' ? '' : '/api';

      const action = props.action ? baseApi + props.action : baseApi + '/mz/upload/image';
      const headers = {
        Authorization: `Bearer ${token}`,
        'X-Auth-Token': `${token}`,
      };
      const list = ref<any[]>([]);
      const loading = ref<boolean>(false);
      const imageUrl = ref<string>('');
      const emitData = ref<any[]>([]);
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);
      watch(
        () => {
          if (Array.isArray(props.value)) list.value = props.value;
          return props.value;
        },
        (value) => {
          if (Array.isArray(value)) {
            list.value = value;
          }
        },
      );
      const handleCancel = () => {
        previewVisible.value = false;
      };
      const handlePreview = async (file: FileItem) => {
        if (!file.url && !file.preview) {
          file.preview = (await getBase64(file.originFileObj)) as string;
        }
        previewImage.value = file.url || file.preview;
        previewVisible.value = true;
      };
      const handleChange = (info: FileInfo) => {
        // 文件上传状态是不是正在上传中
        if (info.file.status === 'uploading') {
          loading.value = true;
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (base64Url: string) => {
            imageUrl.value = base64Url;
            loading.value = false;
          });
          state.value = list.value;
          if (props.name === 'video' || props.name === 'file') {
            list.value[0].thumbUrl = list.value[0].response.data;
          }
          change(list.value);
        }
        if (info.file.status === 'error') {
          loading.value = false;
          message.error('upload error');
        }
      };

      const beforeUpload = (file: FileItem) => {
        // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        // if (!isJpgOrPng && props.name == 'image') {
        //   message.error('You can only upload JPG file!');
        // }
        const isLtSize = file.size / 1024 / 1024 < props.fileSize;
        if (!isLtSize) {
          message.error(`Image must smaller than ${props.fileSize}MB!`);
        }
        return isLtSize;
      };
      // 删除
      const handleRemove = () => {
        setTimeout(() => {
          list.value = list.value.filter((item) => item.status !== 'removed');
          state.value = list.value;
          change(list.value);
        }, 0);
      };

      function change(val) {
        emitData.value = val;
      }

      return {
        state,
        attrs,
        change,
        list,
        action,
        headers,
        loading,
        imageUrl,
        previewVisible,
        previewImage,
        handleCancel,
        handlePreview,
        handleChange,
        beforeUpload,
        handleRemove,
      };
    },
  });
</script>

<style lang="less" scoped>
  .upload-wrap {
    min-height: 150px;
    .tips {
      line-height: 32px;
      margin-bottom: 0;
      color: #999;
    }
  }
</style>
