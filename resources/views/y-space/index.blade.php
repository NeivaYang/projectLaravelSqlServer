@section('title', 'Y-space')
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Y-space') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{ __("Y-space!") }}
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
<script src="{{ asset('js/y-space-scripts/y-space.js?v=1.0.2') }}"></script>