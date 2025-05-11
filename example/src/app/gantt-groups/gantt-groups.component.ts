import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { GanttViewType, GanttItem, GanttGroup, NgxGanttComponent } from 'ngx-gantt';
// import { randomGroupsAndItems } from '../helper';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { random, randomGroupsAndItems, randomItems } from '../helper';

@Component({
    selector: 'app-gantt-groups-example',
    templateUrl: './gantt-groups.component.html',
    standalone: false
})
export class AppGanttGroupsExampleComponent implements OnInit {
    views = [
        {
            name: '日',
            value: GanttViewType.day
        },
        {
            name: '周',
            value: GanttViewType.week
        },
        {
            name: '月',
            value: GanttViewType.month
        },
        {
            name: '季',
            value: GanttViewType.quarter
        },
        {
            name: '年',
            value: GanttViewType.year
        }
    ];

    viewType: GanttViewType = GanttViewType.quarter;

    items: GanttItem[] = [];

    groups: GanttGroup[] = [];

    expanded = true;

    @ViewChild('gantt') ganttComponent: NgxGanttComponent;

    @HostBinding('class.gantt-example-component') class = true;

    constructor() {}

    ngOnInit(): void {
        this.groups = [
            { id: '000000', title: 'Group-0' },
            { id: '000001', title: 'Group-1' },
            { id: '000002', title: 'Group-2' }
        ];
        this.items = [
            {
                id: '000000',
                title: 'Task 0',
                group_id: '000000',
                expanded: true,
                children: [
                    { id: '0-0', title: 'test', start: 1628423200, end: 1629429000 },
                    { id: '0-1', title: 'test-1', start: 1630423200, end: 1631429000 }
                ]
            },
            { id: '000001', title: 'Task 1', start: 1617361997, end: 1625483597, group_id: '000000' },
            {
                id: '000002',
                title: 'Task 2',
                start: 1628421197,
                end: 1628421197,
                group_id: '000001',
                expanded: true,
                children: [
                    { id: '1-0', title: 'test', start: 1628423200, end: 1629429000 },
                    { id: '1-1', title: 'test-1', start: 1630423200, end: 1631429000 }
                ]
            },
            { id: '000003', title: 'Task 3', start: 1628421197, end: 1628421197, group_id: '000001' },
            { id: '000004', title: 'Task 4', start: 1628421197, end: 1628421197, group_id: '000002' },
            { id: '000005', title: 'Task 5', start: 1628421197, end: 1628421197, group_id: '000002' }
        ];
    }

    expandAllGroups() {
        if (this.expanded) {
            this.expanded = false;
            this.ganttComponent.collapseAll();
        } else {
            this.expanded = true;
            this.ganttComponent.expandAll();
        }
    }

    childrenResolve = (item: GanttItem) => {
        const children = randomItems(random(1, 5), item);
        return of(children).pipe(delay(1000));
    };
}
