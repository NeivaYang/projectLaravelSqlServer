@section('title', 'Dashboard')
<x-app-layout>
    <x-slot name="header">
        <h2 class="tw-font-semibold tw-text-xl tw-text-gray-800 tw-dark:text-gray-200 tw-leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    @if (Auth::user()->role == 'admin')
        <form id="KpiChartsData">
            <input type="hidden" id="total_users" name="total_users" value="{{ $total_users }}">
            <input type="hidden" id="total_bank_accounts" name="total_bank_accounts" value="{{ $total_bank_accounts }}">
            <input type="hidden" id="total_pending" name="total_pending" value="{{ $total_pending }}">
            <input type="hidden" id="total_approved" name="total_approved" value="{{ $total_approved }}">
            <input type="hidden" id="total_disapproved" name="total_disapproved" value="{{ $total_disapproved }}">
            <input type="hidden" id="pix_type_cpf" name="pix_type_cpf" value="{{ $pix_type_cpf }}">
            <input type="hidden" id="pix_type_cnpj" name="pix_type_cnpj" value="{{ $pix_type_cnpj }}">
            <input type="hidden" id="pix_type_email" name="pix_type_email" value="{{ $pix_type_email }}">
            <input type="hidden" id="pix_type_phone" name="pix_type_phone" value="{{ $pix_type_phone }}">
            <input type="hidden" id="pix_type_random" name="pix_type_random" value="{{ $pix_type_random }}">
        </form>
        <div class="tw-flex tw-items-center tw-justify-evenly">
            <div class="col-6">
                <div class="tw-pt-12">
                    <div class="tw-max-w-7xl tw-mx-auto sm:tw-px-3 lg:tw-px-4">
                        <div class="tw-bg-white tw-dark:tw-bg-gray-800 tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg">
                            <div class="tw-p-6 tw-text-gray-900 tw-dark:text-gray-100 text-center">
                                {{ __('Total de usuários cadastrados: ') }} <b>{{ $total_users}}</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="tw-pt-12">
                    <div class="tw-max-w-7xl tw-mx-auto sm:tw-px-3 lg:tw-px-4">
                        <div class="tw-bg-white tw-dark:tw-bg-gray-800 tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg">
                            <div class="tw-p-6 tw-text-gray-900 tw-dark:text-gray-100 text-center">
                                {{ __('Total de contas bancárias cadastradas: ') }} <b>{{ $total_bank_accounts}}</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tw-flex tw-items-center tw-justify-evenly">
            <div class="col-6">
                <div class="tw-pt-4">
                    <div class="tw-max-w-7xl tw-mx-auto sm:tw-px-3 lg:tw-px-4">
                        <div class="tw-bg-white tw-dark:tw-bg-gray-800 tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg">
                            <div class="tw-p-6 tw-text-gray-900 tw-dark:text-gray-100" id="chart-status">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="tw-pt-4">
                    <div class="tw-max-w-7xl tw-mx-auto sm:tw-px-3 lg:tw-px-4">
                        <div class="tw-bg-white tw-dark:tw-bg-gray-800 tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg">
                            <div class="tw-p-6 tw-text-gray-900 tw-dark:text-gray-100 text-center" id="chart-pix-type">
                                <b>{{ __('Total de contas bancárias cadastradas: ') }}</b> {{ $total_bank_accounts}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @else
        <div class="tw-pt-12">
            <div class="tw-max-w-7xl tw-mx-auto sm:tw-px-6 lg:tw-px-8">
                <div class="tw-bg-white tw-dark:tw-bg-gray-800 tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg">
                    <div class="tw-p-6 tw-text-gray-900 tw-dark:text-gray-100 text-center">
                        {{ __('Bem Vindo ao Dashboard Y-Space!') }}
                    </div>
                </div>
            </div>
        </div>
        <div class="tw-py-4">
            <div class="tw-max-w-7xl tw-mx-auto sm:tw-px-6 lg:tw-px-8">
                <div class="tw-bg-white tw-dark:tw-bg-gray-800 tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg">
                    <div class="tw-p-6 tw-text-gray-900 tw-dark:tw-text-gray-100">
                        <div class="tw-flex tw-items-center tw-justify-center gap-2 mb-2">
                            <p>
                                {{ __('Ganhe um conselho clicando no botão: ') }}
                            </p>
                            <x-primary-button id="button-advice">
                                {{ __('Conselho') }}
                            </x-primary-button>
                        </div>
                        <div class="tw-p-6 tw-text-gray-900 tw-dark:tw-text-gray-100 tw-flex tw-items-center tw-justify-center">
                            <div class="advice-content">
                                <div class="advice-text">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif
    @section('scripts')
        <script src="{{ asset('js/y-space-scripts/dashboard.js?v=1.0.2') }}"></script>
    @endsection
</x-app-layout>
