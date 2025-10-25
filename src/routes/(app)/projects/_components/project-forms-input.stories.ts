import { Component } from 'lucide-svelte';
import ProjectFormsInput from './project-forms-input.svelte';
import type { Project } from '@/types/project';

export default{
    title: 'Pages/Project/ProjectFormsInput',
    component: ProjectFormsInput,
    parameters: {
        layout: 'centered',
    }
};

export const notTextArea = {
    args:{
        label:"Title",
        name:"title",
    }
}

export const TextArea = {
    args:{
        label:"Title",
        name:"title",
        isTextArea:true,
    }
}