<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/12/15
 * Time: 5:47 PM
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
 * Class MembershipCommand
 *
 * @package Bux\HomeBundle\Command
 */
class MembershipCommand extends ContainerAwareCommand
{

    protected function configure()
    {
        $this
            ->setName('status:free')
            ->setDescription('Status default');
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
        $status = $em->getRepository('BuxUserBundle:Membership')->find(1);
        $qb = $em->getRepository('BuxUserBundle:User')->createQueryBuilder('u');
        $qb
            ->where('u.membershipEndDate < :date')
            ->andWhere('u.roles <> :role')
            ->andWhere('u.roles <> :admin')
            ->andWhere('u.membership <> :status')
            ->setParameter('date', $date)
            ->setParameter('role', serialize(array('ROLE_FAKE')))
            ->setParameter('admin', serialize(array('ROLE_ADMIN')))
            ->setParameter('status', $status);

        $users = $qb->getQuery()->getResult();
        if ($users) {

            /* @var $user User */
            foreach ($users as $user) {
                $user->setMembership($status);
            }
        }

        $em->flush();

        $output->writeln($text);
    }
}