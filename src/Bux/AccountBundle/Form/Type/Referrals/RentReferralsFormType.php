<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/5/15
 * Time: 10:51 AM
 */

namespace Bux\AccountBundle\Form\Type\Referrals;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class RentReferralsFormType
 *
 * @package Bux\AccountBundle\Form\Type\Referrals
 */
class RentReferralsFormType extends AbstractType
{
    private $user;
    private $em;

    /**
     * @param User          $user
     * @param EntityManager $em
     */
    public function __construct(User $user, EntityManager $em)
    {
        $this->user = $user;
        $this->em   = $em;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('package', new RentReferralsType($this->user, $this->em), array(
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'rent_referrals_form_type';
    }
}