<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\BankList;
use App\Models\BankAccounts;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BankAccounts>
 */
class BankAccountsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        // metodo para pegar um banco aleataorio de BankList
        $bank = BankList::query()->select('*')->inRandomOrder()->first();
        return [
            'user_id' => $this->faker->randomElement(User::pluck('id')),
            'ispb' => $bank->ispb,
            'bank' => $bank->name,
            'agency' => $this->faker->randomNumber(4),
            'agency' => strval($this->faker->randomNumber(4)),
            'number' => strval($this->faker->randomNumber(6)),
            'digit' => $this->faker->randomNumber(1),
            'type' => $this->faker->randomElement(['current', 'savings']),
            'pix_type' =>  $this->faker->randomElement(['cpf', 'cnpj', 'email', 'phone', 'random']),
            'pix_key' => $this->faker->regexify('[a-zA-Z0-9]{20}'),
            'status' =>  $this->faker->randomElement(['pending', 'approved', 'disapproved']),
            // 'disapproval_justification' => $this->faker->text(),
        ];
    }
}
