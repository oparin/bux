<?php
/**
 * Created by PhpStorm.
 * User: oparin
 * Date: 1/21/15
 * Time: 5:31 PM
 */

namespace Bux\OfficeBundle\Form\Type\Advertise;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class PollCreditsFormType
 *
 * @package Bux\OfficeBundle\Form\Type\Advertise
 */
class PollCreditsFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('poll', 'entity', array(
                'class'         => 'Bux\Admin\AdvertisementsBundle\Entity\PollPackages',
                'property'      => 'credits',
                'constraints'   => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'poll_credits_form_type';
    }
}