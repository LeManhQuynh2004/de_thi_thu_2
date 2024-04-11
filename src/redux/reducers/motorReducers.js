import { createSlice } from "@reduxjs/toolkit";
import { addMotorAPI, deleteMotorApi, updateMotorApi } from "../actions/motorActions";
const initialState = {
    listMotor: []
}
const motorSlice = createSlice({
    name: 'motor',
    initialState,
    reducers: {
        addMotor(state, action) {
            state.listMotor.push(action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(addMotorAPI.fulfilled, (state, action) => {
            state.listMotor.push(action.payload);
        })
            .addCase(addMotorAPI.rejected, (state, action) => {
                // Xử lý khi yêu cầu thêm todo bị từ chối hoặc xảy ra lỗi
                console.log('Add todo rejected:', action.error.message);
            });


        //DELETE

        builder.addCase(deleteMotorApi.fulfilled, (state, action) => {
            // Xóa todo
            state.listMotor = state.listMotor.filter(row => row.id !== action.payload);

        }).addCase(deleteMotorApi.rejected, (state, action) => {
            // Xử lý khi yêu cầu xóa todo bị từ chối hoặc xảy ra lỗi
            console.log('Delete todo rejected:', action.error.message);
        });

        builder.addCase(updateMotorApi.fulfilled, (state, action) => {
            // lấy tham số truyền vào
            // console.log(action);
            const { id, name_ph32353, price_ph32353, describe_ph32353, color_ph32353, image_ph32353 } = action.payload;
            // tìm bản ghi phù hợp với tham số truyền vào
            const motor = state.listMotor.find(row => row.id === id);
            // update
            if (motor) {
                motor.name_ph32353 = name_ph32353,
                    motor.price_ph32353 = price_ph32353,
                    motor.describe_ph32353 = describe_ph32353,
                    motor.color_ph32353 = color_ph32353,
                    motor.image_ph32353 = image_ph32353
            }
        })
            .addCase(updateMotorApi.rejected, (state, action) => {
                // Xử lý khi yêu cầu Sửa todo bị từ chối hoặc xảy ra lỗi
                console.log('Update todo rejected:', action.error.message);
            });

    },
})
export const { addMotor } = motorSlice.actions;
export default motorSlice.reducer;