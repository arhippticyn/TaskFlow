import { createSelector } from "@reduxjs/toolkit";

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLogin = (state) => state.auth.isLogin;

export const selectTaskId = (state) => state.tasks.selectedTaskId;
export const selectTasks = (state) => state.tasks.tasks
export const selectIsAddPut = (state) => state.tasks.isAddPut;
export const selectTask = createSelector([selectTasks, selectTaskId], (task, task_id) => {
    return task.id === task_id
})