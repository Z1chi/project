<?php
declare(strict_types=1);

namespace Ufo\Component\Console;

use Symfony\Component\Console\Command\Command as BaseCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Ufo\Service\DatabaseService;

abstract class Command extends BaseCommand
{
    private ?OutputInterface $output = null;

    public function __construct(string $name = null)
    {
        parent::__construct($name);

        $databaseService = new DatabaseService();
        $databaseService->initEloquent();
    }

    abstract protected function onExecute(): void;

    /**
     * Executes the current command.
     *
     * This method is not abstract because you can use this class
     * as a concrete class. In this case, instead of defining the
     * execute() method, you set the code to execute by passing
     * a Closure to the setCode() method.
     *
     * @param InputInterface  $input
     * @param OutputInterface $output
     * @return int 0 if everything went fine, or an exit code
     *
     * @see setCode()
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->output = $output;
        $this->onExecute();

        return 0;
    }

    protected function display(string $message): void
    {
        $this->output->writeln($message);
    }

    protected function displaySl(string $message): void
    {
        $this->output->write($message);
    }
}
