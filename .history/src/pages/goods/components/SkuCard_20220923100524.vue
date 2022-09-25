<template>
    <el-form-item label="规格选项">
        <el-card shadow="never">
            <template #header>
                <div>
                    <el-input placeholder="规格名称" style="width:200px;">
                        <template #append>
                            <el-icon>
                                <more />
                            </el-icon>
                        </template>
                    </el-input>

                    <el-button size="small">
                        <el-icon>
                            <Top />
                        </el-icon>
                    </el-button>
                    <el-button size="small">
                        <el-icon>
                            <Button />
                        </el-icon>
                    </el-button>
                    <el-button size="small">
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>

                </div>
            </template>
            <!-- card body -->
        </el-card>

    </el-form-item>

</template>