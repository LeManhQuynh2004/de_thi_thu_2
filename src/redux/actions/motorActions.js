import { createAsyncThunk } from '@reduxjs/toolkit';
import { addMotor } from '../reducers/motorReducers';
const api_url = 'http://10.0.2.2:3000/Motorbike';
export const fetchMotors = () => {
    return async dispatch => {
        try {
            fetch(api_url).then(res => res.json()).then((data) => {
                data.forEach(row => {
                    dispatch(addMotor(row));
                });
            }).catch(err => console.log(err))
        } catch (error) {
            console.error('Error fetching lists:', error);
        }
    };
};

export const addMotorAPI = createAsyncThunk(
    'motor/addMotorAPI',
    async (objTodo, thunkAPI) => {
        console.log(objTodo);
        try {
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objTodo)
            });
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteMotorApi = createAsyncThunk(
    'motor/deleteMotorApi',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                return id;
            } else {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra 
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const updateMotorApi = createAsyncThunk(
    'motor/updateMotorApi',
    async (objUpdate, thunkAPI) => {
        try {

            const response = await fetch(`${api_url}/${objUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objUpdate.data)
            });

            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);