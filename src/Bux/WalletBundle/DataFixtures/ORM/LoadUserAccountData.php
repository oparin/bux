<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/8/15
 * Time: 10:24 AM
 */

namespace Bux\WalletBundle\DataFixtures\ORM;

use Bux\WalletBundle\Entity\UserPaymentAccount;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadUserAccountData
 *
 * @package Bux\WalletBundle\DataFixtures\ORM
 */
class LoadUserAccountData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
//        $account = new UserPaymentAccount();
//        $account->setUser($this->getReference('user'));
//        $account->setPaymentMethod($this->getReference('pm'));
//        $account->setAccount('pm_account');
//        $manager->persist($account);
//
//        $account = new UserPaymentAccount();
//        $account->setUser($this->getReference('user'));
//        $account->setPaymentMethod($this->getReference('payeer'));
//        $account->setAccount('payeer_account');
//        $manager->persist($account);

//        $account = new UserPaymentAccount();
//        $account->setUser($this->getReference('user'));
//        $account->setPaymentMethod($this->getReference('ep'));
//        $account->setAccount('ep_account');
//        $manager->persist($account);
//
//        $account = new UserPaymentAccount();
//        $account->setUser($this->getReference('user'));
//        $account->setPaymentMethod($this->getReference('bc'));
//        $account->setAccount('bc_account');
//        $manager->persist($account);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 3;
    }
}