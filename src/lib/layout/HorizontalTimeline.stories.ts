import HorizontalTimeline from "./HorizontalTimeline.svelte"

export default {
    title: 'Atoms/Timelines/HorizontalTimeline',
    component: HorizontalTimeline,

};

export const HorizontalTimelineArea = {
    args : {
        generations: [
            {schoolYear: "18/19"},
            {schoolYear: "19/20"},
            {schoolYear: "20/21"},
            {schoolYear: "21/22"},
            {schoolYear: "22/23"},
        ]
    }
};