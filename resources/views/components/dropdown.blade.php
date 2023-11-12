@props(['align' => 'right', 'width' => '48', 'contentClasses' => 'py-1 bg-white dark:bg-gray-700'])

@php
switch ($align) {
    case 'left':
        $alignmentClasses = 'tw-ltr:origin-top-left tw-rtl:origin-top-right tw-start-0';
        break;
    case 'top':
        $alignmentClasses = 'tw-origin-top';
        break;
    case 'right':
    default:
        $alignmentClasses = 'tw-ltr:origin-top-right tw-rtl:origin-top-left tw-end-0';
        break;
}

switch ($width) {
    case '48':
        $width = 'tw-w-48';
        break;
}
@endphp

<div class="tw-relative" x-data="{ open: false }" @click.outside="open = false" @close.stop="open = false">
    <div @click="open = ! open">
        {{ $trigger }}
    </div>

    <div x-show="open"
            x-transition:enter="tw-transition ease-out tw-duration-200"
            x-transition:enter-start="tw-opacity-0 tw-scale-95"
            x-transition:enter-end="tw-opacity-100 tw-scale-100"
            x-transition:leave="tw-transition ease-in tw-duration-75"
            x-transition:leave-start="tw-opacity-100 tw-scale-100"
            x-transition:leave-end="tw-opacity-0 tw-scale-95"
            class="tw-absolute tw-z-50 tw-mt-2 {{ $width }} tw-rounded-md tw-shadow-lg {{ $alignmentClasses }}"
            style="display: none;"
            @click="open = false">
        <div class="tw-rounded-md tw-ring-1 tw-ring-black tw-ring-opacity-5 {{ $contentClasses }}">
            {{ $content }}
        </div>
    </div>
</div>
