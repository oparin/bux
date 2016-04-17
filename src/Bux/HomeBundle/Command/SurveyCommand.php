<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/12/15
 * Time: 6:33 PM
 */

namespace Bux\HomeBundle\Command;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Class SurveyCommand
 *
 * @package Bux\HomeBundle\Command
 */
class SurveyCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('survey:bonus')
            ->setDescription('Survey bonus');
    }

    /**
     * @param InputInterface  $input
     * @param OutputInterface $output
     *
     * @return int|null|void
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $text = 'ok';

        /* @var $em EntityManager */
        $em = $this->getContainer()->get('doctrine.orm.default_entity_manager');

        $date = new \DateTime();
//        $status = $em->getRepository('BuxUserBundle:Membership')->find(1);
        $qb = $em->getRepository('BuxUserBundle:User')->createQueryBuilder('u');
        $qb
            ->where('u.roles <> :role')
            ->andWhere('u.roles <> :admin')
            ->setParameter('role', serialize(array('ROLE_FAKE')))
            ->setParameter('admin', serialize(array('ROLE_ADMIN')));

        $users = $qb->getQuery()->getResult();
        if ($users) {

            /* @var $user User */
            foreach ($users as $user) {
                $qb = $em->getRepository('BuxStatisticBundle:PollCompleteStatistic')->createQueryBuilder('os');
                $qb
                    ->where('os.user = :user')
                    ->andWhere('os.date < :date')
                    ->setParameter('user', $user)
                    ->setParameter('date', $date);

                $ads = $qb->getQuery()->getResult();
                if ($ads) {
                    $sum = $user->getSurveyWalletBalance()->getSum();
                    $user->getSurveyWalletBalance()->setSum(0);
                    $balance = $user->getSurveyWalletAvailableBalance();
                    $balance->setSum($balance->getSum() + $sum);

                    $em->flush();
                }
            }
        }

        $em->flush();

        $output->writeln($text);
    }
}