import { defHttp } from '/@/utils/http/axios';
// 设置api枚举
enum Api {
  // 列表
  contentList = '/research/report/query/list',
  // 删除
  contentDel = '/research/report/del',
  // 添加活修改
  contentEdit = '/research/report/edit',
  // 获取标签
  contentThird = '/research/report/web/third',
  // 根据一级类别  获取二级类别
  contentSecondary = '/research/report/web/secondary',
  // 获取绑定二维码
  contentqr = '/crawling/qr',
  // 执行爬取
  contentoption = '/crawling/option',
  // 查询扫码状态
  contentask = '/crawling/ask',
  // 获得公众号批次列表
  contentClimb = '/official/acc/climb',
  // 获取公众号管理列表
  contentAccList = '/official/acc/page',
  // 编辑公众号条目
  contentAccEdit = '/official/acc/edit',
  // 删除公众号条目
  contentAccDel = '/official/acc/del',
  // 获取爬取标签
  contentAccClimb = '/official/acc/climb',
  // 获取所属标签
  contentAccCType = '/official/acc/type',
}
/**
 * @description 我的研究所,研究报告,调研纪要列表接口
 * @param current - 当前页码
 * @param record - 查询内容,里面可以包括投资思路,盘面解析,组合走势
 * @param record.reportCategory - 一级类别:  我的研究所 MY_INSTITUTE ,研究报告 RESEARCH_REPORT,研究纪要 RESEARCH_NOTES
 * @param record.secondaryCategory - 二级类别: 我的研究所: 总量 MY_TOTAL,制造 MY_PRODUCT,消费 MY_CONSUMPTION, 周期 MY_CYCLE,科技 MY_TECHNOLOGY,其他 MY_OTHER ,研究报告 RESEARCH_REPORT: 个股研报 STOCK_RESEARCH,行业研报 INDUSTRY_RESEARCH,深度公司 DEEP_COMPANY,深度行业 DEEP_INDUSTRY ,研究纪要 RESEARCH_NOTES: 公司纪要 COMPANY_NOTES,行业纪要 INDUSTRY_NOTES,机构观点 INSTITUTIONAL_PERSPECTIVE
 * @param record.thirdCategory - 三级类别: 个股研报 STOCK_RESEARCH,行业研报 INDUSTRY_REPORT,深度公司 DEEP_COMPANY,深度行业 DEPTH_INDUSTRY ,研究报告 RESEARCH_REPORT: 个股研报 STOCK_RESEARCH,行业研报 INDUSTRY_RESEARCH,深度公司 DEEP_COMPANY,深度行业 DEEP_INDUSTRY ,研究纪要 RESEARCH_NOTES: 公司纪要 COMPANY_NOTES,行业纪要 INDUSTRY_NOTES,机构观点 INSTITUTIONAL_PERSPECTIVE
 * @param size - 每页显示多少条
 */
export const contentList = (params) => defHttp.post({ url: Api.contentList, params });
export const contentEdit = (params) => defHttp.post({ url: Api.contentEdit, params });
export const contentDel = (params) => defHttp.get({ url: Api.contentDel, params });
export const contentThird = (params) => defHttp.get({ url: Api.contentThird, params });
export const contentSecondary = (params) =>
  defHttp.get({
    url: Api.contentSecondary,
    params,
  });
export const contentask = (params) =>
  defHttp.get({ url: Api.contentask, params }, { isTransformResponse: false });
export const contentqr = (params) => defHttp.get({ url: Api.contentqr, params });
export const contentoption = (params) => defHttp.get({ url: Api.contentoption, params });
export const contentClimb = (params) => defHttp.get({ url: Api.contentClimb, params });
export const contentAccList = (params) => defHttp.post({ url: Api.contentAccList, params });
export const contentAccEdit = (params) => defHttp.post({ url: Api.contentAccEdit, params });
export const contentAccDel = (params) => defHttp.get({ url: Api.contentAccDel, params });
export const contentAccClimb = (params) => defHttp.get({ url: Api.contentAccClimb, params });
export const contentAccCType = (params) => defHttp.get({ url: Api.contentAccCType, params });
