<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/16/14
 * Time: 12:21 PM
 */

namespace Bux\UserBundle\DataFixtures\ORM;

use Bux\Admin\HomeBundle\Entity\AdminSettings;
use Bux\UserBundle\Entity\User;
use Bux\WalletBundle\Entity\PurchaseWallet;
use Bux\WalletBundle\Entity\SurveyWalletAvailableBalance;
use Bux\WalletBundle\Entity\SurveyWalletBalance;
use Bux\WalletBundle\Entity\Wallet;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadUserData
 *
 * @package Bux\UserBundle\DataFixtures\ORM
 */
class LoadUserData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $date = new \DateTime('NOW');

        $admin = new User();
        $admin->setUsername('admin');
        $admin->setPlainPassword('admin');
        $admin->setEmail('admin@admin.com');
        $admin->setEnabled(true);
        $admin->addRole('ROLE_ADMIN');
        $admin->setFullName('admin admin');
        $admin->setCountry('AU');
        $admin->setRegistrationDate($date);
        $manager->persist($admin);
        $this->addReference('admin', $admin);
        $settings = new AdminSettings();
        $settings->setUser($admin);
        $manager->persist($settings);

//        $user = new User();
//        $user->setUsername('user');
//        $user->setPlainPassword('user');
//        $user->setEmail('user@user.com');
//        $user->setEnabled(true);
//        $user->addRole('ROLE_USER');
//        $user->setFullName('user user');
//        $user->setCountry('AU');
//        $user->setRegistrationDate($date);
//        $user->setMembership($this->getReference('lollipop'));
//        $manager->persist($user);
//        $this->addReference('user', $user);
//        $wallet = new Wallet();
//        $wallet->setUser($user);
//        $manager->persist($wallet);
//        $purchaseWallet = new PurchaseWallet();
//        $purchaseWallet->setUser($user);
//        $manager->persist($purchaseWallet);
//        $surveyWallet = new SurveyWalletBalance();
//        $surveyWallet->setUser($user);
//        $manager->persist($surveyWallet);
//        $surveyWallet = new SurveyWalletAvailableBalance();
//        $surveyWallet->setUser($user);
//        $manager->persist($surveyWallet);
//
//        $file = file_get_contents('web/uploads/reg.txt');
//        $nicks = explode("\r\n", $file);
//
//        $file = file_get_contents('web/uploads/cc.txt');
//        $countries = explode("\r\n", $file);
//
//        for ($i = 0; $i < 500; $i++) {
//            $user = new User();
//            $user->setUsername($nicks[$i]);
//            $user->setPlainPassword(md5(time()));
//            $user->setEmail($nicks[$i] . '@fake.com');
//            $user->setEnabled(false);
//            $user->addRole('ROLE_FAKE');
//            $user->setFullName($nicks[$i] . '_' . $nicks[$i]);
//            $user->setCountry($countries[rand(0, count($countries) - 2)]);
//            $user->setRegistrationDate($date);
////        $user->setMembership($this->getReference('lollipop'));
//            $manager->persist($user);
//        }
//
//        $memberships = array();
//        $memberships[] = $this->getReference('try_me');
//        $memberships[] = $this->getReference('cake');
//        $memberships[] = $this->getReference('chocolate');
//        $memberships[] = $this->getReference('caramel');
//        $memberships[] = $this->getReference('candy');
//        $memberships[] = $this->getReference('sweet');
//
//        $file = file_get_contents('web/uploads/upg.txt');
//        $nicks = explode("\r\n", $file);
////        var_dump($nicks);exit;
//        for ($i = 0; $i < 500; $i++) {
//            $user = new User();
//            $user->setUsername($nicks[$i]);
//            $user->setPlainPassword(md5(time()));
//            $user->setEmail($nicks[$i] . '@fake.com');
//            $user->setEnabled(false);
//            $user->addRole('ROLE_FAKE');
//            $user->setFullName($nicks[$i] . '_' . $nicks[$i]);
//            $user->setCountry($countries[rand(0, count($countries) - 2)]);
//            $user->setRegistrationDate($date);
//            $user->setMembership($memberships[rand(0, count($memberships) - 1)]);
//            $manager->persist($user);
//        }

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 2;
    }
}