import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TouchspinDirective } from './directives/touchspin.directive';
import { FlexLabelsDirective } from './directives/flex-labels.directive';
import { MaskInputDirective } from './directives/mask-input.directive';
import { AutoCompleteDirective } from './directives/auto-complete.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { SelectTagsDirective } from './directives/select-tags.directive';
import { SelectableDirective } from './directives/selectable.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { AutoHeightDirective } from './directives/auto-height.directive';
import { ScrollableDirective } from './directives/scrollable.directive';
import { ElementHeightDirective } from './directives/element-height.directive';
import { DatepickerDirective } from './directives/datepicker.directive';
import { PopoverDirective } from './directives/popover.directive';
import { ImagePreviewDirective } from './directives/image-preview.directive';
import { BindContentPipe } from './pipes/bind-content.pipe';
import { CapitalizeDirective } from './directives/capitalize.directive';
import { GroupByPipe } from './pipes/group-by.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SpacePipe } from './pipes/space.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { PipesPipe } from './pipes.pipe';
import { EventCategoryPipe } from './pipes/event-category.pipe';
import { TimezonePipe } from './pipes/timezone.pipe';
import { DecodePipe } from './pipes/decode.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TouchspinDirective,
    FlexLabelsDirective,
    MaskInputDirective,
    AutoCompleteDirective,
    AutoFocusDirective,
    SelectTagsDirective,
    SelectableDirective,
    TooltipDirective,
    AutoHeightDirective,
    ScrollableDirective,
    ElementHeightDirective,
    DatepickerDirective,
    PopoverDirective,
    ImagePreviewDirective,
    BindContentPipe,
    CapitalizeDirective,
    GroupByPipe,
    OrderByPipe,
    SpacePipe,
    CapitalizePipe,
    ClickOutsideDirective,
    PipesPipe,
    EventCategoryPipe,
    TimezonePipe,
    DecodePipe
  ],
  exports: [
    TouchspinDirective,
    FlexLabelsDirective,
    MaskInputDirective,
    AutoCompleteDirective,
    AutoFocusDirective,
    SelectTagsDirective,
    SelectableDirective,
    TooltipDirective,
    AutoHeightDirective,
    ScrollableDirective,
    ElementHeightDirective,
    DatepickerDirective,
    PopoverDirective,
    ImagePreviewDirective,
    BindContentPipe,
    CapitalizeDirective,
    GroupByPipe,
    OrderByPipe,
    SpacePipe,
    CapitalizePipe,
    ClickOutsideDirective,
    EventCategoryPipe,
    TimezonePipe,
    DecodePipe
  ]
})
export class SharedModule { }

