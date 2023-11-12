@props(['active'])

@php
$classes = ($active ?? false)
            ? 'tw-block tw-w-full tw-ps-3 tw-pe-4 tw-py-2 tw-border-l-4 tw-border-indigo-400 tw-dark:border-indigo-600 tw-text-start tw-text-base tw-font-medium tw-text-indigo-700 tw-dark:text-indigo-300 tw-bg-indigo-50 tw-dark:bg-indigo-900/50 tw-focus:outline-none tw-focus:text-indigo-800 tw-dark:focus:text-indigo-200 tw-focus:bg-indigo-100 tw-dark:focus:bg-indigo-900 tw-focus:border-indigo-700 tw-dark:focus:border-indigo-300 tw-transition tw-duration-150 tw-ease-in-out'
            : 'tw-block tw-w-full tw-ps-3 tw-pe-4 tw-py-2 tw-border-l-4 tw-border-transparent tw-text-start tw-text-base tw-font-medium tw-text-gray-600 tw-dark:text-gray-400 tw-hover:text-gray-800 tw-dark:hover:text-gray-200 tw-hover:bg-gray-50 tw-dark:hover:bg-gray-700 tw-hover:border-gray-300 tw-dark:hover:border-gray-600 tw-focus:outline-none tw-focus:text-gray-800 tw-dark:focus:text-gray-200 tw-focus:bg-gray-50 tw-dark:focus:bg-gray-700 tw-focus:border-gray-300 tw-dark:focus:border-gray-600 tw-transition tw-duration-150 tw-ease-in-out';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a>
