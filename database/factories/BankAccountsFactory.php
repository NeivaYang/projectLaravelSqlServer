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
            'type' => rand(0, 1), // ensure "type" value is one of the allowed values
            'pix_type' =>  array_rand([0, 1, 2, 3, 4]),
            'pix_key' => $this->faker->randomElement(['00000000000', '00000000000000', 'email@mail.com', '34999999999', '0000000000000000000000000000000']),
            'status' =>  array_rand([0, 1, 2]),
            'disapproval_justification' => $this->faker->text(),
        ];
    }
}
