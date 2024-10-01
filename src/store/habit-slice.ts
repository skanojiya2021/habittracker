import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

export interface Habit {
    id: string;
    name: string;
    frequency: 'daily' | 'weekly';
    completedDates: string[];
    createdDate: string
}

interface HabitState {
    habits: Habit[];
    isLoading:boolean,
    error:string | null;
    
}
const initialState: HabitState = {
    habits: [],
    isLoading:false,
    error:null
}
export const fetchHabit = createAsyncThunk('habits/fetchHabits', async() => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // const mockHabits: Habit[] = [
    //     {
    //         id:'1',
    //         name:'Read',
    //         frequency:'daily',
    //         completedDates:[],
    //         createdDate:new Date().toISOString(),
    //     },
    //     {
    //         id:'2',
    //         name:'Exercise',
    //         frequency:'daily',
    //         completedDates:[],
    //         createdDate:new Date().toISOString(),
    //     }
    // ];
    // return mockHabits;
})
const habitSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        addHabit: (
            state,
            action: PayloadAction<{ name: string; frequency: 'daily' | 'weekly' }>
        ) => {
            const newHabit: Habit = {
                id: Date.now().toString(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                completedDates: [],
                createdDate: new Date().toISOString(),
            };
            state.habits.push(newHabit);
        },
        toggleHabit: (
            state,
            action: PayloadAction<{ id: string; date: string }>
        ) => {
            const habit = state.habits.find((h) => h.id === action.payload.id);
            if (habit) {
                const index = habit.completedDates.indexOf(action.payload.date)
                if (index > -1) {
                    habit.completedDates.splice(index, 1);
                } else {
                    habit.completedDates.push(action.payload.date)
                }
            }
        },
        removeHabit: () =>{}
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchHabit.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchHabit.fulfilled, (state, action) => {
            state.isLoading = false;
            // state.habits = action.payload;
        })
        .addCase(fetchHabit.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch habits';
        })
    }
})
export const { addHabit, toggleHabit } = habitSlice.actions;
export default habitSlice.reducer