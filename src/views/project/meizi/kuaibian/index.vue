<template>
  <div class="card-drag-container">
    <div style='background:#303030;margin-bottom:30px;'>
      <div>
        <el-row>
          <el-col class='text-l ptb10' :span="12"><div>全部时长：5212</div></el-col>
          <el-col class='text-r pt2' :span="12">
            <div>
              <el-button type="primary">预览</el-button>
              <el-button type="primary">另存为</el-button>
              <el-button>清空</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="ptb10" style="background:black;margin:0 10px;border-top:1px dash #303030;border-bottom:1px dash #303030;height:50px;">
        <vab-draggable :list="List2"  group="people"  @change="log" v-bind="dragOptions">
          <span
            v-for="element in List2"
            :key="element.id"
            style="width: 50px;height: 50px;margin-right: 10px;"
          >
            <video style="width: 50px;height: 50px;" :src="element.url"></video>
          </span>
        </vab-draggable>
      </div>
    </div>
         <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item style="width: 200px;">
            <el-input  v-model="queryForm.title" placeholder="输入标题" />
          </el-form-item>
           <el-form-item style="width: 130px;">
            <el-input v-model="queryForm.title" placeholder="时间段" />
          </el-form-item>
          <el-form-item style="width: 100px;">
            <el-input v-model="queryForm.title" placeholder="发布人" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              搜索
            </el-button>
          </el-form-item>
        </el-form>
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <el-radio-button class="is-active" label="全部">全部</el-radio-button>
      <el-radio-button label="直播归档">直播归档</el-radio-button>
      <el-radio-button label="新媒体中心">新媒体中心</el-radio-button>
      <el-radio-button label="小编上传">小编上传</el-radio-button>
      <el-radio-button label="时政新闻">时政新闻</el-radio-button>
      <el-radio-button label="民生新闻">民生新闻</el-radio-button>
    </el-radio-group>
    <el-row :gutter="20">
      <vab-draggable :list="iconList"  :group="{ name: 'people', pull: 'clone', put: false }"
                     @change="log" v-bind="dragOptions">
        <el-col
          v-for="(item, index) of 32"
          :key="index"
          :lg="3"
          :md="3"
          :sm="6"
          :xl="3"
          :xs="12"
        >
          <video style="width: 100%;" src="https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4"></video>
        </el-col>
      </vab-draggable>
    </el-row>
  </div>
</template>
<script>
  import { getIconList } from "@/api/remixIcon";
  import vabDraggable from "vuedraggable";
  export default {
    name: "CardDrag",
    components: {
      vabDraggable,
    },
    data() {
      return {
        List1: [{
          id:1,
          url:'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4'
        },{
          id:2,
          url:'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4'
        }],
        List2:[{
          id:1,
          url:'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4'
        },{
          id:2,
          url:'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4'
        }],
        tabPosition: '全部',
         queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
      };
    },
    computed: {
      dragOptions() {
        return {
          animation: 600,
          group: "description",
        };
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
      log: function(evt) {
        window.console.log(evt);
      },
      shuffle(array) {
        var m = array.length,
          t,
          i;
        while (m) {
          i = Math.floor(Math.random() * m--);
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
        return array;
      },
      randomHexColor() {
        const arr = [
          "#1890FF",
          "#36CBCB",
          "#4ECB73",
          "#FBD437",
          "#F2637B",
          "#975FE5",
        ];
        return this.shuffle(arr);
      },
      async fetchData() {
        const { data } = await getIconList({
          pageNo: 1,
          pageSize: 32,
        });
        this.iconList = data.map((icon, index) => {
          return { icon, color: this.randomHexColor(), order: index + 1 };
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .icon-panel {
    height: 120px;
    text-align: center;
    cursor: move;
    user-select: none;

    &:hover {
      i {
        transform: scale(1.15);
      }
    }

    i {
      display: block;
      width: 50px;
      height: 50px;
      margin: auto;
      font-size: 40px;
      transition: all ease-in-out 0.3s;
    }

    p {
      margin-top: 10px;
    }
  }
  .text-l{
    text-align: left;
    color: white;
  }
  .text-r{
     text-align: right;
  }
  .ptb10{
    padding: 10px;
  }
  .pt2{
    padding-top: 2px;
    padding-bottom: 10px;
  }
</style>
