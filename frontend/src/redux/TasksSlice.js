import { createSlice } from "@reduxjs/toolkit"
import { AddTasks, DeleteTask, GetTasks, PutTask } from "./operation"

const TaskInitialState = {
  tasks: [],
  IsLoading: true,
  selectedTaskId: null,
  isAddPut: false
};

const TaskSlice = createSlice({
    name: 'tasks',
    initialState: TaskInitialState,

    reducers: {
        selectTask(state,action) {
            state.isAddPut = true
            state.selectedTaskId = action.payload
        },
        selectPage(state) {
            state.isAddPut = false
            state.selectedTaskId = null
        },
        selectAddPage(state) {
            state.isAddPut = true
        }
    },

    extraReducers: (builder) => {
        builder
             .addCase(AddTasks.pending, (state) => {
                state.IsLoading = true
             })
             .addCase(AddTasks.fulfilled, (state, action) => {
                state.IsLoading = false
                state.tasks.push(action.payload)
             })
            .addCase(PutTask.pending, (state) => {
                state.IsLoading = true
            })
            .addCase(PutTask.fulfilled, (state, action) => {
                state.IsLoading = false

                const index = state.tasks.findIndex(
                    task => task.id === action.payload.id
                )

                if (index !== -1) {
                    state.tasks[index] = action.payload
                }

                state.isAddPut = false
                state.selectedTaskId = null
            })
            .addCase(GetTasks.pending, (state) => {
                state.IsLoading = true
            })
            .addCase(GetTasks.fulfilled, (state, action) => {
                state.IsLoading = false
                state.tasks = action.payload
            })
            .addCase(DeleteTask.pending, (state) => {
                state.IsLoading = true
            })
            .addCase(DeleteTask.fulfilled, (state, action) => {
                state.IsLoading = false
                state.tasks = state.tasks.filter(task => task.id !== action.payload)
            })
    }
})

export const { selectTask, selectPage, selectAddPage } = TaskSlice.actions;


export const TaskReducer = TaskSlice.reducer