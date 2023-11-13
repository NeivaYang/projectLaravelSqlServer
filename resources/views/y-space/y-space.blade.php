@section('title', 'Y-space')
<x-app-layout>
    <x-slot name="header">
        <h2 class="tw-font-semibold tw-text-xl tw-text-gray-800 tw-dark:text-gray-200 tw-leading-tight">
            {{ __('Y-space') }}
        </h2>
    </x-slot>

    <div class="tw-pt-12">
        <div class="tw-max-w-7xl tw-mx-auto tw-sm:px-6 tw-lg:px-8">
            <div class="tw-bg-white tw-dark:tw-bg-gray-800 tw-overflow-hidden tw-shadow-sm sm:tw-rounded-lg">
                <div class="tw-p-6 tw-text-gray-900 tw-dark:text-gray-100 text-center">
                    {{ __("Y-space!") }} <br>
                    {{ __("Aqui você pode gerenciar suas contas e adicionar novas.") }}
                </div>
            </div>
        </div>
    </div>

    <div class="accordion accordion-flush tw-py-4" id="accordionManageAccounts">
        <div class="accordion-item tw-max-w-7xl tw-mx-auto sm:tw-rounded-lg">
            <h2 class="accordion-header" id="accordionHeadinMangeAccounts">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionMangeAccountsDrop" aria-expanded="false" aria-controls="accordionMangeAccountsDrop">
                <strong>Gerencie suas conta.</strong>
                </button>
            </h2>
            <div id="accordionMangeAccountsDrop" class="accordion-collapse collapse" aria-labelledby="accordionHeadinMangeAccounts" data-bs-parent="#accordionManageAccounts">
                <div class="accordion-body">
                    <div class="tw-max-w-7xl tw-mx-auto tw-py-6 tw-sm:px-6 tw-lg:px-8">
                        <div class="tw-overflow-hidden tw-shadow-sm tw-rounded-lg">
                            <div class="tw-min-w-full">
                                <input hidden id="route" data-url="{{ route('YSpaceController.getBankAccounts') }}">
                                @if(Auth::user()->role != 'admin')
                                    <table class="tw-min-w-full tw-divide-y tw-divide-gray-200">
                                        <thead class="tw-bg-gray-50">
                                            <tr>
                                                <th scope="col" class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Dia do Pedido</th>
                                                <th scope="col" class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Nome do Banco</th>
                                                <th scope="col" class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Tipo da Conta</th>
                                                <th scope="col" class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Chave Pix</th>
                                                <th scope="col" class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Status</th>
                                                <th scope="col" class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody class="tw-bg-white tw-divide-y tw-divide-gray-200 {{ Auth::user()->role != 'admin' ? 'active' : '' }}" id="list-bankAccounts-table">
                                            {{-- <tr>
                                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">xxxxxxxx</td>
                                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">xxxxxxxx</td>
                                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">xxxxxxxx</td>
                                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">xxxxxxxx</td>
                                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">xxxxxxx</td>
                                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">
                                                    xxxxxxxxx
                                                </td>
                                            </tr> --}}
                                        <tbody>
                                    </table>
                                @else
                                    <table class="tw-min-w-full tw-divide-y tw-divide-gray-200">
                                        <thead class="tw-bg-gray-50">
                                            <tr>
                                                <th scope="col" class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Dia do Pedido</th>
                                                <th scope="col" class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Nome do usuario</th>
                                                <th scope="col" class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Nome do Banco</th>
                                                <th scope="col" class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Tipo da Conta</th>
                                                <th scope="col" class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Chave Pix</th>
                                                <th scope="col" class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Status</th>
                                                <th scope="col" class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody class="tw-bg-white tw-divide-y tw-divide-gray-200 {{ Auth::user()->role == 'admin' ? 'active' : '' }}" id="list-bankAccounts-table-admin">
                                            {{-- <tr>
                                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">xxxxxxxx</td>
                                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">xxxxxxxx</td>
                                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">xxxxxxxx</td>
                                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">xxxxxxxx</td>
                                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">xxxxxxxx</td>
                                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">xxxxxxx</td>
                                                <td class="tw-px-3 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-dark-500 tw-uppercase tw-tracking-wider">
                                                    xxxxxxxxx
                                                </td>
                                            </tr> --}}
                                        <tbody>
                                    </table>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>








                    {{-- @if(Auth::user()->role != 'admin')
                        <table>
                            <thead>
                                <tr>
                                    <td>Dia do Pedido</td>
                                    <td>Nome do Banco</td>
                                    <td>Tipo da Conta</td>
                                    <td>Tipo da Chave Pix</td>
                                    <td>Chave Pix</td>
                                    <td>Ações</td>
                                </tr>
                            </thead>
                            <tbody id="list-bankAccounts-table">

                            </tbody>
                        </table>
                    @else
                        <table>
                            <thead>
                                <tr>
                                    <td>Dia do Pedido</td>
                                    <td>Nome do Usuario</td>
                                    <td>Nome do Banco</td>
                                    <td>Tipo da Conta</td>
                                    <td>Tipo da Chave Pix</td>
                                    <td>Chave Pix</td>
                                    <td>Ações</td>
                                </tr>
                            </thead>
                            <tbody id="list-bankAccounts-table-admin">
                            </tbody>
                        </table>
                    @endif
                </div> --}}
            </div>
            <h2 class="accordion-header" id="accordionHeadinAddAccounts">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionAddAccountsDrop" aria-expanded="false" aria-controls="accordionAddAccountsDrop">
                <strong>Adicione uma conta.</strong>
                </button>
            </h2>
            <div id="accordionAddAccountsDrop" class="accordion-collapse collapse" aria-labelledby="accordionHeadinAddAccounts" data-bs-parent="#accordionManageAccounts">
                <div class="accordion-body">
                    <div class="col-lg-10 mx-auto">
                        <div class="card">
                            <div class="card-body">
                                    <!-- FORM ADD ACC -->
                                <div class="tab-pane fade show active gap-1" id="conta" role="tabpanel" aria-labelledby="home-tab">
                                    <form id="AddBankAccForm" action="{{ route('YSpaceController.store') }}" method="POST">
                                        @csrf
                                        <div class="d-flex">
                                            <div class="col-6">
                                                <x-input-label for="bank" :value="__('Banco')" />
                                                {{-- <label class="text-label">Banco</label> --}}
                                                <select class="tw-border-gray-300 tw-dark:tw-border-gray-700 tw-dark:tw-bg-gray-900 tw-dark:tw-text-gray-300 focus:tw-border-indigo-500 tw-dark:focus:tw-border-indigo-600 focus:tw-ring-indigo-500 tw-dark:focus:tw-ring-indigo-600 tw-rounded-md tw-shadow-sm tw-block tw-mt-1 tw-w-full" data-live-search="true" name="bank" id="bank">
                                                    <option selected disabled>Banco</option>
                                                    @foreach($bank_list as $bank)
                                                        <option value="{{ $bank->code . '-' . $bank->ispb }}">{{ $bank->code }} - {{ $bank->name }}</option>
                                                    @endforeach
                                                </select>
                                            </div>

                                            <div class="col-6">
                                                <x-input-label for="agency" :value="__('Agencia')" />
                                                <x-text-input id="agency" class="tw-block tw-mt-1 tw-w-full number" type="text" name="agency" :value="null"/>
                                            </div>
                                        </div>

                                        <div class="d-flex">
                                            <div class="col-6">
                                                <x-input-label for="number" :value="__('Conta')"/>
                                                <x-text-input id="number" class="tw-mt-1 tw-w-full number" type="text" name="number" />
                                            </div>
                                            <div class="col-6">
                                                <x-input-label for="digit" :value="__('Digito')"/>
                                                <x-text-input id="digit" class="tw-mt-1 tw-w-full number" type="text" name="digit" />
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <x-input-label for="select-bank-acc-type-id" :value="__('Tipo de Conta')" />
                                            <select class="tw-border-gray-300 tw-dark:tw-border-gray-700 tw-dark:tw-bg-gray-900 tw-dark:tw-text-gray-300 focus:tw-border-indigo-500 tw-dark:focus:tw-border-indigo-600 focus:tw-ring-indigo-500 tw-dark:focus:tw-ring-indigo-600 tw-rounded-md tw-shadow-sm tw-block tw-mt-1 tw-w-full" id="select-bank-acc-type-id" name="type">
                                                <option value="0" selected>Corrente</option>
                                                <option value="1">Poupança</option>
                                            </select>
                                        </div>

                                        <hr class="divider mt-4 mb-4">

                                        <div class="form-group">
                                            <x-input-label for="select-bank-pix-type" :value="__('Tipo de Chave')" />
                                            <select  class="tw-border-gray-300 tw-dark:tw-border-gray-700 tw-dark:tw-bg-gray-900 tw-dark:tw-text-gray-300 focus:tw-border-indigo-500 tw-dark:focus:tw-border-indigo-600 focus:tw-ring-indigo-500 tw-dark:focus:tw-ring-indigo-600 tw-rounded-md tw-shadow-sm tw-block tw-mt-1 tw-w-full" id="select-bank-pix-type" name="pix_type">
                                                <option value="1">CPF</option>
                                                <option value="2">CNPJ</option>
                                                <option value="3">Email</option>
                                                <option value="4">Telefone</option>
                                                <option value="5">Aleatória</option>
                                            </select>
                                        </div>

                                        <div>
                                            <x-input-label for="pix-chave" :value="__('Chave')" />
                                            <x-text-input id="pix-chave" class="tw-block tw-mt-1 tw-w-full" type="text" name="pix_key" :value="null"/>
                                        </div>

                                        <x-primary-button class="tw-ms-3 mt-2" onclick="event.preventDefault();$('#AddBankAccForm').submit()">
                                            {{ __('Adicionar Conta') }}
                                        </x-primary-button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
    {{-- @section('scripts')
        <script src="{{ asset('js/y-space-scripts/y-space.js?v=1.0.2') }}"></script>
    @endsection --}}
</x-app-layout>