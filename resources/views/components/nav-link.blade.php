@props(['active'])

@php
$classes = ($active ?? false)
            ? 'tw-inline-flex tw-items-center tw-px-1 tw-pt-1 tw-border-b-2 tw-border-indigo-400 tw-dark:tw-border-indigo-600 tw-text-sm tw-font-medium tw-leading-5 tw-text-gray-900 tw-dark:tw-text-gray-100 focus:tw-outline-none focus:tw-border-indigo-700 tw-transition tw-duration-150 tw-ease-in-out'
            : 'tw-inline-flex tw-items-center tw-px-1 tw-pt-1 tw-border-b-2 tw-border-transparent tw-text-sm tw-font-medium tw-leading-5 tw-text-gray-500 tw-dark:tw-text-gray-400 hover:tw-text-gray-700 tw-dark:hover:tw-text-gray-300 hover:tw-border-gray-300 tw-dark:hover:tw-border-gray-700 focus:tw-outline-none tw-focus:text-gray-700 tw-dark:focus:text-gray-300 focus:tw-border-gray-300 tw-dark:focus:tw-border-gray-700 tw-transition tw-duration-150 tw-ease-in-out';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a>
