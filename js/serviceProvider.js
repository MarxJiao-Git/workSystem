var vue = new Vue({
    el: '#serviceProvider',
    data: function () {
        return {
            paginationTotal: 500,//总条数
            paginationPageSize: 20,//每一页显示的数量
            loading: false,// 加载框
            putIn: false,//“放入操作台”的按钮是否显示
            currentPage: 1,
            multipleSelection: [],//多选所选中的项
            searchForm:{
                showMoreCondition:false,//是否显示更多搜索条件
                selectMoreCase: false,// 搜索条件-是否选择了多个case单
                businessCategorySelected: '',//搜索条件输入框-选择的业务类型
                businessCategoryArray: [{ //搜索条件输入框-业务类型选项
                    value: '',
                    label: '请选择'
                },{
                    value: '1294',
                    label: '空调'
                }],
                corporateName:'',//公司名称
                legalRepresentative:'',//法人代表
                phoneNumber:'',//手机号码
                agency:'',//所属办事处
                accountStatusSelected: '',//搜索条件输入框-选择的账号状态
                accountStatus: [{ //搜索条件输入框-账号状态选项
                    value: '',
                    label: '请选择'
                },{
                    value: '1',
                    label: '停用'
                }],
                registrationAuditsStatusSelected: '',//搜索条件输入框-选择的注册审核状态
                registrationAuditsStatus: [{ //搜索条件输入框-注册审核状态
                    value: '',
                    label: '请选择'
                },{
                    value: '0',
                    label: '待审核'
                }],
                dissolutionAuditsStatusSelected: '',//搜索条件输入框-选择的解约审核状态
                dissolutionAuditsStatus: [{ //搜索条件输入框-解约审核状态
                    value: '',
                    label: '请选择'
                },{
                    value: 'business_status',
                    label: '业务主管审核'
                }],
                depositAmountSelected: '',//搜索条件输入框-选择的押金金额
                depositAmount: [{ //搜索条件输入框-押金金额
                    value: '',
                    label: '请选择'
                },{
                    value: '0',
                    label: '免押金'
                }],
                depositPaymentStatusSelected: '',//搜索条件输入框-选择的押金缴纳状态
                depositPaymentStatus: [{ //搜索条件输入框-押金缴纳状态
                    value: '',
                    label: '请选择'
                },{
                    value: '1',
                    label: '未缴纳'
                }],
                serviceCategorySelected: '',//搜索条件输入框-选择的服务品类
                serviceCategory: [{ //搜索条件输入框-服务品类
                    value: '',
                    label: '请选择'
                },{
                    value: '1',
                    label: '空调'
                }],
                serviceItemsSelected: '',//搜索条件输入框-选择的服务品类
                serviceItems: [{ //搜索条件输入框-服务品类
                    value: '',
                    label: '请选择'
                },{
                    value: '2',
                    label: '维修'
                }],
                createTime:[],
                auditPassTime:[],
                dissolutionTime:[],
            },
            tableData: [{
                col1: '停用',
                col2: '审核通过',
                col3: '业务主管审核',
                col4: 'TV总部服务',
                col5: 'TCL小家电',
                col6: '深圳市鸿铭达机电制冷设备有限公司',
                col7: '秦丽娟',
                col8: '19999999999',
                col9: '新疆维吾尔自治区',
                col10: '武汉市',
                col11: '武昌区',
                col12: '空调/空调/家用中央空调/',
                col13: '维修/安装/清洗/',
                col14: '124566.00',
                col15: '124566.00',
                col16: '124566.00',
                col17: '已缴纳',
                col18: '2018-05-22 16:58',
                col19: '2018-05-22 16:58',
                col20: '2018-05-22 16:58',
                col21: '2018-05-22 16:58',
                col22: '2018-05-22 16:58'
            },{
                col1: '停用',
                col2: '审核通过',
                col3: '业务主管审核',
                col4: 'TV总部服务',
                col5: 'TCL小家电',
                col6: '深圳市鸿铭达机电制冷设备有限公司',
                col7: '秦丽娟',
                col8: '19999999999',
                col9: '新疆维吾尔自治区',
                col10: '武汉市',
                col11: '武昌区',
                col12: '空调/空调/家用中央空调/',
                col13: '维修/安装/清洗/',
                col14: '124566.00',
                col15: '124566.00',
                col16: '124566.00',
                col17: '已缴纳',
                col18: '2018-05-22 16:58',
                col19: '2018-05-22 16:58',
                col20: '2018-05-22 16:58',
                col21: '2018-05-22 16:58',
                col22: '2018-05-22 16:58'
            }],
        }
    },
    methods: {
        // 搜索按钮点击执行
        search: function () {
            // 请求参数
            var params = {
                caseNoSearch: this.caseNoSearch,// case单号输入框的内容
            };
            this.request('/verify/code', params, '搜索失败', function (callback) {
                // 搜索有结果-把搜索到的结果赋值给tableData3;
                // $this.tableData=response.data.code;

                // 如果没有搜索到结果，执行下面的一段提示
                // $this.$alert('根据你设置的查询条件，没有搜索到相关厂商。', '提示', {
                //     confirmButtonText: '确定',
                //     type: 'warning',
                //     center: true,
                //     callback: action => {
                //         //点击确定后的操作
                //     }
                // });
            });
        },
        // 每一页显示的条数变化
        handleSizeChange(val) {
            console.log('每页 ' + val + ' 条');

        },
        // 分页点击执行
        handleCurrentChange(val) {
            // 页数改变，需要改变查询
            // console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.tableData = [];//先清空表格数据
            // 请求参数
            var params = {
                pageSize: val// 改变页码
            };
            this.request('/verify/code', params, '查询失败', function (callback) {
            });
        },
        // 多选事件
        handleSelectionChange(val) {
            this.multipleSelection = val;
            if (this.multipleSelection.length == 1) {
                this.putIn = true;
                this.searchForm.selectMoreCase = true;
            } else {
                this.putIn = false;
                this.searchForm.selectMoreCase = false;
            }
        },
        getAxiosInstance: function () {
            var _self = this;
            var instance = axios.create({
                baseURL: "http://120.76.157.13:666/mapi",
                method: 'post'
            });
            instance.interceptors.request.use(function (config) {
                // 在发送请求之前做些什么
                _self.loading = true;
                return config;
            }, function (error) {
                // 对请求错误做些什么
                _self.loading = false;
                _self.$message.error('加载失败');
                return Promise.reject(error);
            });
            instance.interceptors.response.use(function (response) {
                //对响应数据做点什么
                // 关闭加载框
                _self.loading = false;
                return response;
            }, function (error) {
                // 对响应错误做点什么 error.response.status
                // 关闭加载框
                _self.loading = false;
                return Promise.reject(error);
            });
            return instance;
        },
        // 请求封装
        request(url, params, errorToast, callback) {
            var $this = this;
            $this.getAxiosInstance().post(url, params).then(function (response) {
                if (response.status == 200) {
                    if (response.data.code == '0000') {
                        callback(response.data.data);//请求结果回调
                    } else {
                        // 其他返回结果
                        $this.$message.warning(response.data.msg);
                    }
                } else {
                    $this.$message.error(errorToast);
                }
            }).catch(function (error) {
                if (error.response && error.response.status != 200) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    $this.$message.error(errorToast);
                } else {
                    $this.$message.error('网络异常');
                }
            });
        }
    }
})